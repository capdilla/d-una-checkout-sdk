export interface Address {
  id: number;
  user_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  identity_document: string;
  lat: number;
  lng: number;
  address1: string;
  address2: string;
  city: string;
  zipcode: string;
  state_name: string;
  state_code: string;
  country: string;
  address_type: string;
  additional_description: string;
  is_default_address: boolean;
  is_last_address: boolean;
  is_billing_address: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  country_code?: string;
}

export interface AddressPayload {
  first_name: string;
  last_name: string;
  phone: string;
  identity_document: string;
  lat: number;
  lng: number;
  address1: string;
  address2: string;
  city: string;
  zipcode: string;
  state_name: string;
  state_code: string;
  country: string;
  address_type: string;
  additional_description: string;
  is_default: boolean;
  is_billing_address: boolean;
}
