export interface User {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  identity_document: string;
  identity_providers: Identityprovider[];
  is_phone_verified: boolean;

  is_guest: boolean;
}

interface Identityprovider {
  id: number;
  provider_name: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface LoginWithEmailPasswordPayload {
  email: string;
  password: string;
}

export interface CreateGuestTokenPayload {
  user_id: string;
}

export interface CreateGuestTokenRequest {
  token: string;
}

export interface CreateUserPayload {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  identity_document: string;
}

export interface CreateUserResponse {
  token: string;
  user_id: string;
}

export interface EditUserPayload {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  identity_document: string;
}

export interface CreateUserResponse {
  token: string;
  user_id: string;
}

export interface RequestOtpPayload {
  email: string;
}

export enum OtpType {
  Email = 'email-passwordless',
  Sms = 'sms-passwordless'
}
export interface RequestOtpParams {
  type?: OtpType;
}

export interface LoginWithOtpPayload {
  email: string;
  otp: string;
}
export interface ChangePasswordPayload {
  email: string;
  otp: string;
  password: string;
}

export interface ChangePasswordResponse {
  token: string;
}
