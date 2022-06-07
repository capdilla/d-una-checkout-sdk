import { Response200 } from '@duna/client';
import { CardTokenized } from '../payment';
import { Address } from '../address';
import { ServiceConfig } from '../base-service';
import { OrderResponse, CreditCard, Order, OrderWithShippingMethods, ShippingRate } from './interfaces';
import { PaymentResponse } from './interfaces/PaymentResponse';
import { PaymentMethod } from '../merchant';
import { InstallmentsResponse, Installment } from './interfaces/Installments';
export default class OrderModel {
    private guestEmail;
    private deviceId;
    private userInstructions;
    private userCreditCard;
    private userCardTokenized;
    private config;
    private financialInstitution;
    private callbackUrl;
    private recaptchaToken;
    private paymentMethod;
    private installments;
    private cashChange;
    constructor(order: OrderResponse, config: ServiceConfig);
    private getClient;
    private getOrderState;
    getOrder(): Order;
    getShippingRate(): ShippingRate;
    refetchOrder(): Promise<void>;
    private setOrder;
    setRecaptchaToken(token: string): Promise<void>;
    private getUser;
    processPayment(): Promise<import("../../utils/formatResponse").ResponseSdk<PaymentResponse>>;
    setDeviceId(deviceId: string): void;
    setBillingAddress(address: Address): Promise<import("../../utils/formatResponse").ResponseSdk<Response200>>;
    setCashChange(change: number): void;
    setPaymentMethod(paymentMethod: PaymentMethod): void;
    setCardTokenized(card: CardTokenized, cvv: string, zipcode?: string): void;
    verifyPaymentez(otpCode: string): Promise<import("@duna/client").ResponseWithError<OrderResponse>>;
    /**
     * Use this method if you need to pay with a card without save
     * @param {CreditCard} card
     */
    setCreditCard(card: CreditCard): void;
    /**
     * Use this method in case that your user is guest
     * @param email
     */
    setGuestEmail(email: string): void;
    /**
     * Use this method when you need to use PSE
     * @param financialInstitution
     */
    setFinancialInstitution(financialInstitution: string): void;
    /**
     * Use this method when you need to use callbackUrl
     * @param callbackUrl
     */
    setCallbackUrl(callbackUrl: string): void;
    /**
     * Use this method to add user instructions to purchase
     * @param userInstructions
     */
    setUserInstructions(userInstructions: string): void;
    getNequiStatus(): Promise<import("@duna/client").ResponseWithError<OrderResponse>>;
    /**
     * Set the the installment selected by the user
     * @param installments
     */
    setInstallments(installments: Installment): void;
    applyCoupon(couponCode: string): Promise<import("../../utils/formatResponse").ResponseSdk<Response200>>;
    removeCoupon(couponCode: string): Promise<import("../../utils/formatResponse").ResponseSdk<Response200>>;
    getShippingMethods(payload: Address): Promise<import("../../utils/formatResponse").ResponseSdk<OrderWithShippingMethods>>;
    setShippingMethod(methodCode: string): Promise<import("../../utils/formatResponse").ResponseSdk<OrderResponse>>;
    setShippingRate(payload: Address): Promise<import("../../utils/formatResponse").ResponseSdk<Response200>>;
    /**
     *
     * @param bin the bin are the first 6 digits of the credit card
     */
    getInstallments(bin: string): Promise<import("../../utils/formatResponse").ResponseSdk<InstallmentsResponse>>;
}
