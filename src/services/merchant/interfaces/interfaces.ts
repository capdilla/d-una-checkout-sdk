export interface Merchant {
  id: string;
  short_name: string;
  country: string;
  currency: string;
  logo_url: string;
  term_and_conditions_url: string;
  use_duna_send: boolean;
  latitude: number;
  longitude: number;
  ok: boolean;
  use_shipping_methods: boolean;
  merchant_config?: MerchantConfig;
}

export interface MerchantConfig {
  id: string;
  merchant_id: string;
  configuration: Configuration;
  image_url: string;
  theme?: Theme;
  created_at: string;
  updated_at: string;
}

export interface Theme {
  main_color?: string;
  secondary_color?: string;
  background_color?: string;
}

export interface Configuration {
  is_identity_document_hide?: boolean;
  show_rfc?: boolean;
  hide_powered_by_deuna?: boolean;
  hide_address_map?: boolean;
}

export enum PaymentMethodTypes {
  CreditCard = 'credit_card',
  Cash = 'cash',
  POS = 'pos',
  DebitCard = 'debit_card',
  BNPL = 'bnpl',
  Voucher = 'voucher',
  PSE = 'pse'
}

export enum PaymentProcessorName {
  DLocalDebit = 'dlocal_debito',
  Paymentez = 'paymentez_credit',
  Paypal = 'paypal',
  PaypalCommercePlatform = 'paypal_commerce_platform',
  PaypalPlus = 'paypal_plus',
  Conekta = 'conekta_credit',
  Oxxo = 'oxxo',
  Baloto = 'baloto',
  Efecty = 'efecty',
  Kueski = 'kueski',
  Addi = 'addi',
  Zip = 'zip',
  Aplazo = 'aplazo',
  Nequi = 'nequi',
  Stripe = 'stripe',
  Sistecredito = 'sistecredito',
  PhysicalTransfer = 'physical_transfer',
  Cash = 'cash',
  SpeiOpenpay = 'openpay_spei',
  MercadoPago = 'mercadopago',
  Payu = 'payu',
  Wompi = 'wompi'
}

export interface PaymentMethod {
  enabled: boolean;
  method_type: PaymentMethodTypes;
  specific_fields?: Specificfields;
  processor_name?: PaymentProcessorName;
  labels?: Record<string, string>;
}

interface Specificfields {
  financial_institutions?: Financialinstitution[];
}

export interface Financialinstitution {
  Id: string;
  Description: string;
}
export interface MerchantResponse {
  id: string;
  country: string;
  name: string;
  stores: Store[];
  currency: string;
  logo_url: string;
  term_and_conditions_url: string;
}

interface Store {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}
