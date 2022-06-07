import { isErrorResponse, Response200 } from '@duna/client';
import { CardTokenized } from '../payment';
import { Endpoints, servicesEndpoints } from '../../endpoints';
import { ErrorsCode } from '../../utils/errros';
import { formatReponse } from '../../utils/formatResponse';
import { Address } from '../address';
import { ServiceConfig } from '../base-service';

import {
  OrderResponse,
  OrderResponseWithoutToken,
  CreditCard,
  ProcessPayPayload,
  Order,
  OrderWithShippingMethods,
  ShippingRate
} from './interfaces';
import { PaymentResponse } from './interfaces/PaymentResponse';
import { PaymentMethodTypes } from '..';
import { PaymentMethod, PaymentProcessorName } from '../merchant';
import { InstallmentsResponse, Installment } from './interfaces/Installments';

export default class OrderModel {
  private guestEmail: string;
  private deviceId: string;
  private userInstructions: string;
  private userCreditCard: CreditCard;
  private userCardTokenized: CardTokenized | null;
  private config: ServiceConfig;
  private financialInstitution: string;
  private callbackUrl: string;
  private recaptchaToken: string;
  private paymentMethod: PaymentMethod;
  private installments: Installment | null;
  private cashChange: number;

  constructor(order: OrderResponse, config: ServiceConfig) {
    this.config = config;
    this.setOrder(order);
  }

  private getClient() {
    return this.config.context.getState().client;
  }

  private getOrderState() {
    return this.config.context.getState().order;
  }

  getOrder(): Order {
    return this.getOrderState().order;
  }

  getShippingRate(): ShippingRate {
    return this.getOrderState().shipping_rate;
  }

  async refetchOrder() {
    const token = this.getOrderState().token;
    const response = await this.getClient().get<OrderResponse>(
      `${Endpoints.Merchants}/orders/${token}`
    );

    if (!isErrorResponse(response)) {
      this.setOrder(response);
    }
  }

  private setOrder(newOrder: OrderResponse) {
    const oldOrder = this.config.context.getState().order;
    this.config.context.setState({ order: { ...oldOrder, ...newOrder } });
  }

  async setRecaptchaToken(token: string) {
    this.recaptchaToken = token;
  }

  private getUser() {
    return this.config.context.getState().user;
  }

  async processPayment() {
    if (!this.paymentMethod) {
      throw new Error(ErrorsCode.PaymentMethodNotSet);
    }

    const email = this.getUser()?.email || this.guestEmail;
    if (!email) throw new Error(ErrorsCode.EmailNotSet);

    const getCardId = () => {
      return this.userCardTokenized
        ? { card_id: this.userCardTokenized.id }
        : {};
    };

    const getCallBackAndFinalcialIns = () => {
      if (
        this.paymentMethod.method_type === PaymentMethodTypes.BNPL ||
        this.paymentMethod.processor_name === PaymentProcessorName.Kueski
      ) {
        return {
          specific_fields: {
            description: 'Payment from DEUNA',
            callbacks: {
              on_success: this.callbackUrl || '',
              on_reject: this.callbackUrl || '',
              on_canceled: this.callbackUrl || '',
              on_failed: this.callbackUrl || ''
            }
          }
        };
      }

      return {
        specific_fields: {
          financial_institution: this.financialInstitution
        }
      };
    };

    const getCreditCard = (): CreditCard => {
      return {
        ...(this.installments
          ? { installments: this.installments.installments }
          : {}),
        ...this.userCreditCard
      };
    };

    const storeCode = this.getOrderState().order.store_code;

    if (!storeCode) {
      throw new Error(ErrorsCode.EmnptyStoreCode);
    }

    const payload: ProcessPayPayload = {
      token: this.getOrderState().token,
      email,
      store_code: storeCode,
      method_type: this.paymentMethod.method_type,
      ...getCardId(),
      credit_card: getCreditCard(),
      ...getCallBackAndFinalcialIns(),
      callback_url: this.callbackUrl,
      ...(this.deviceId && { device_id: this.deviceId }),
      user_instructions: this.userInstructions,
      captcha_token: this.recaptchaToken,
      processor_name: this.paymentMethod.processor_name ?? '',
      ...(this.paymentMethod.method_type === PaymentMethodTypes.Cash && {
        cash_change: this.cashChange
      })
    };

    const response = await this.getClient().post<PaymentResponse>(
      `${Endpoints.Merchants}${Endpoints.Transactions}/purchase`,
      payload,
      {
        timeout: 60000
      }
    );

    if (!isErrorResponse(response)) {
      const order = this.getOrderState().order;
      this.setOrder({
        ...this.getOrderState(),
        order: { ...order, payment: response.order.payment }
      });
    }

    return formatReponse(response);
  }

  setDeviceId(deviceId: string) {
    this.deviceId = deviceId;
  }

  async setBillingAddress(address: Address) {
    const orderToken = this.getOrderState().token;

    const response = await this.getClient().post<Response200>(
      `${Endpoints.Merchants}${Endpoints.ExternalOrders}/${orderToken}/billing-address`,
      {
        billing_address_id: address.id
      }
    );

    return formatReponse<Response200>(response);
  }

  setCashChange(change: number) {
    this.cashChange = change;
  }

  setPaymentMethod(paymentMethod: PaymentMethod) {
    this.paymentMethod = paymentMethod;
  }

  setCardTokenized(card: CardTokenized, cvv: string, zipcode?: string) {
    this.userCardTokenized = card;
    this.userCreditCard = {
      card_cvv: cvv,
      ...(zipcode && { zip: zipcode })
    };
  }

  async verifyPaymentez(otpCode: string) {
    const orderToken = this.getOrderState().token;
    const response = await this.getClient().post<OrderResponse>(
      `${Endpoints.Merchants}/orders/${orderToken}/transactions/verify`,
      {
        otp: otpCode
      }
    );

    return response;
  }

  /**
   * Use this method if you need to pay with a card without save
   * @param {CreditCard} card
   */
  setCreditCard(card: CreditCard) {
    this.userCreditCard = card;
  }

  /**
   * Use this method in case that your user is guest
   * @param email
   */
  setGuestEmail(email: string) {
    this.guestEmail = email;
  }

  /**
   * Use this method when you need to use PSE
   * @param financialInstitution
   */
  setFinancialInstitution(financialInstitution: string) {
    this.financialInstitution = financialInstitution;
  }

  /**
   * Use this method when you need to use callbackUrl
   * @param callbackUrl
   */
  setCallbackUrl(callbackUrl: string) {
    this.callbackUrl = callbackUrl;
  }

  /**
   * Use this method to add user instructions to purchase
   * @param userInstructions
   */
  setUserInstructions(userInstructions: string) {
    this.userInstructions = userInstructions;
  }

  async getNequiStatus() {
    const orderToken = this.getOrderState().token;

    const response = await this.getClient().post<OrderResponse>(
      `${Endpoints.Merchants}/orders/${orderToken}${Endpoints.Transactions}/nequi/verify`
    );

    return response;
  }

  /**
   * Set the the installment selected by the user
   * @param installments
   */
  setInstallments(installments: Installment) {
    this.installments = installments;
  }

  async applyCoupon(couponCode: string) {
    const orderToken = this.getOrderState().token;

    const response = await this.getClient().post<OrderResponse>(
      `${Endpoints.Merchants}${Endpoints.ExternalOrders}/${orderToken}/coupons`,
      {
        coupon_code: couponCode
      }
    );

    if (!isErrorResponse(response)) {
      this.setOrder({
        ...this.getOrderState(),
        order: response.order,
        token: this.getOrderState().token
      });

      return formatReponse<Response200>({ success: true });
    }

    return formatReponse<Response200>(response);
  }

  async removeCoupon(couponCode: string) {
    const orderToken = this.getOrderState().token;

    const response = await this.getClient().delete<OrderResponse>(
      `${Endpoints.Merchants}${Endpoints.ExternalOrders}/${orderToken}/coupons/${couponCode}`
    );

    if (!isErrorResponse(response)) {
      this.setOrder({
        ...this.getOrderState(),
        order: response.order,
        token: this.getOrderState().token
      });
      return formatReponse<Response200>({ success: true });
    }

    return formatReponse<Response200>(response);
  }

  async getShippingMethods(payload: Address) {
    const orderToken = this.getOrderState().token;

    const response = await this.getClient().post<OrderWithShippingMethods>(
      servicesEndpoints.getShippingMethods(orderToken),
      {
        ...payload,
        country_iso: payload.country
      }
    );

    if (!isErrorResponse(response)) {
      this.setOrder({
        ...this.getOrderState(),
        ...response.order,
        token: this.getOrderState().token
      });
    }

    return formatReponse(response);
  }

  async setShippingMethod(methodCode: string) {
    const orderToken = this.getOrderState().token;

    const response = await this.getClient().patch<OrderResponse>(
      `${Endpoints.Merchants}${Endpoints.ExternalOrders}/${orderToken}/shipping-methods/${methodCode}`
    );

    if (!isErrorResponse(response)) {
      this.setOrder({
        ...response,
        token: this.getOrderState().token
      });
    }

    return formatReponse(response);
  }

  async setShippingRate(payload: Address) {
    const orderToken = this.getOrderState().token;

    const response = await this.getClient().post<OrderResponseWithoutToken>(
      `${Endpoints.Merchants}${Endpoints.ExternalOrders}/${orderToken}/shipping-rate`,
      {
        ...payload,
        country_iso: payload.country
      }
    );

    if (!isErrorResponse(response)) {
      this.setOrder({
        ...response,
        token: this.getOrderState().token
      });

      return formatReponse<Response200>({ success: true });
    }

    return formatReponse<Response200>(response);
  }

  /**
   *
   * @param bin the bin are the first 6 digits of the credit card
   */
  async getInstallments(bin: string) {
    const orderToken = this.getOrderState().token;

    const response = await this.getClient().get<InstallmentsResponse>(
      `${Endpoints.Merchants}/transactions/orders/${orderToken}/installments`,
      { params: { bin } }
    );

    return formatReponse(response);
  }
}
