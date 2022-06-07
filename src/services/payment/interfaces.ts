export interface CreateCardPayload {
  expiry_month: string;
  expiry_year: string;
  card_holder: string;
  card_holder_dni: string;
  card_number: string;
  card_cvv: string;
  address1: string;
  zip: string;
  city: string;
  state: string;
  country: string;
  phone: string;
}

export interface CardTokenized {
  id: string;
  user_id: string;
  card_holder: string;
  card_holder_dni: string;
  token: string;
  company: string;
  last_four: string;
  first_six: string;
  expiration_date: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface Card {
  token: string;
  full_name: string;
  number: string;
  month: number;
  year: number;
  last_four_digits: string;
  first_six_digits: string;
  card_type: string;
  payment_method_type: string;
  address1: string;
  cvv: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone_number: string;
  storage_state: string;
  erros?: string;
  created_at: string;
  updated_at: string;
}
