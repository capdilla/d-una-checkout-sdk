import { ApiError } from '@duna/client';
import { Address } from '../..';

export interface OrderResponse {
  token: string;
  order: Order;
  shipping_rate: ShippingRate;
}

export interface OrderWithShippingMethods
  extends Omit<OrderResponse, 'token' | 'shipping_rate'> {
  shipping_methods: ShippingMethod[];
}

export type OrderResponseWithoutToken = Omit<OrderResponse, 'token'>;

export interface Order {
  order_id: string;
  currency: string;
  tax_amount: number;
  display_tax_amount: string;
  shipping_amount: number;
  display_shipping_amount: string;
  display_sub_total: string;
  items_total_amount: number;
  display_items_total_amount: string;
  sub_total: number;
  store_code?: string;
  total_amount: number;
  total_discount: number;
  display_total_amount: string;
  display_total_discount: string;
  items: Item[];
  discounts: Discount[];
  shipping_address?: Address;
  shipping_options?: ShippingOption;
  user_instructions: string;
  metadata: Metadata;
  status: string;
  payment?: Payment;
  redirect_url?: string;
}

export interface BankTransferMetadata {
  bank?: string;
  email?: string;
  country?: string;
  account_type?: string;
  account_number?: string;
  name?: string;
  document_number?: string;
  document_type?: string;
}

interface PaymentCustomer {
  email: string;
  id: string;
}

export interface PaymentMetadata extends BankTransferMetadata {
  status: string;
  code: string;
  code_qr?: string;
  callback_url?: string;
  external_resource_url?: string;
  reference?: string;
  due_date?: string;
  bank_account?: BankTransferMetadata;
}

export interface Payment {
  data: Data;
  error: ApiError;
  metadata?: PaymentMetadata;
  customer: PaymentCustomer;
}

export enum PaymentStatus {
  Succeeded = 'succeeded',
  Pending = 'pending',
  Processing = 'processing',
  Processed = 'processed',
  Denied = 'denied',
  Voided = 'voided',
  Refunded = 'refunded',
  Cancelled = 'cancelled'
}
interface Data {
  amount: Amount;
  created_at: string;
  customer: Customer;
  from_card?: boolean;
  id: string;
  merchant: Merchant;
  metadata: PaymentMetadata;
  method_type: string;
  processor: string;
  status: PaymentStatus;
  updated_at: string;
}

export interface PurchaseParams {
  deviceId?: string;
}

interface Merchant {
  id: string;
  store_code: string;
}

interface Customer {
  email: string;
  id: string;
}

interface Metadata {
  key1: string;
  key2: string;
  code?: string;
  status?: string;
}

export interface Item {
  brand: string;
  category: string;
  collections: string[];
  color: string;
  description: string;
  details_url: string;
  id: string;
  image_url: string;
  isbn: string;
  manufacturer: string;
  name: string;
  options: string;
  quantity: number;
  size: string;
  sku: string;
  tax_amount: Amount;
  taxable: boolean;
  total_amount: Amount;
  type: string;
  unit_price: Amount;
  uom: string;
  upc: string;
  weight: Weight;
}

interface Weight {
  unit: string;
  weight: number;
}

interface Amount {
  amount: number;
  original_amount: number;
  display_amount: string;
  currency: string;
  currency_symbol: string;
  discount_amount: number;
  display_original_amount: string;
}

interface Discount {
  amount: number;
  display_amount: string;
  code: string;
  description: string;
  details_url: string;
  discount_category: string;
  free_shipping: Freeshipping;
  reference: string;
}

interface Freeshipping {
  is_free_shipping: boolean;
  maximum_cost_allowed: number;
}

export enum ShippingType {
  Pickup = 'pickup',
  DineIn = 'dine_in',
  Delivery = 'delivery'
}
export interface ShippingOption {
  type: ShippingType;
  details: Details;
}

interface Details {
  store_name: string;
  address: string;
  address_coordinates: AddressCoordinates;
  contact: Contact;
  additional_details: Additionaldetails;
}

interface Additionaldetails {
  stock_location?: string;
  table_number?: string;
  pickup_time?: string;
  address_notes?: string;
}

interface Contact {
  name: string;
  phone: string;
}

interface AddressCoordinates {
  lat: number;
  lng: number;
}

export interface ShippingMethod {
  code: string;
  name: string;
  min_delivery_date: string;
  max_delivery_date: string;
  cost: number;
  display_cost: string;
  tax_amount: number;
  display_tax_amount: string;
}

export interface ShippingRate {
  service_name: string;
  description: string;
  cost: number;
  tax_amount: number;
  display_tax_amount: string;
  reference: string;
  estimated_delivery_date: string;
  tax_code: string;
}
