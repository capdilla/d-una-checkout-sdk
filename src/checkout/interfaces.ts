import { Environment } from '../d-una-environment';
import { AuthService } from '../services/auth';
import { AddressService } from '../services/address';
import { CardService } from '../services/payment';
import { CartService } from '../services/cart';
import MerchantService from '../services/merchant/service';

export interface Services
  extends AuthService,
    Omit<AddressService, 'buildEndpoint'>,
    Omit<CardService, 'buildEndpoint'>,
    Omit<CartService, 'buildEndpoint'>,
    MerchantService {}

export interface CheckoutConfig {
  apiKey: string;
  deviceId?: string;
  sessionId?: string;
  authToken?: string;
  env?: Environment;
}
