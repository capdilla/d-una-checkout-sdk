import { PaymentMethodTypes } from '../..';
import { CreateCardPayload } from '../../payment';

export interface CouponPayload {
  coupon_code: string;
}

export interface ShippingRatePayload {
  lat: number;
  lng: number;
  city: string;
}

export type CreditCard = Partial<CreateCardPayload> &
  Pick<CreateCardPayload, 'card_cvv'> & {
    installments?: number;
  };

export interface BNPLPayload {
  description: string;
  callbacks: {
    on_success: string;
    on_reject: string;
    on_canceled: string;
    on_failed: string;
  };
}

export interface DebitCardPayload {
  financial_institution: string;
}

export interface ProcessPayPayload {
  token: string;
  email: string;
  store_code: string;
  method_type: PaymentMethodTypes;
  card_id?: string;
  credit_card?: CreditCard;
  specific_fields?: DebitCardPayload | BNPLPayload;
  callback_url?: string;
  device_id?: string;
  user_instructions: string;
  captcha_token: string;
  processor_name: string;
}
