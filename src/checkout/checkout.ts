import { ClientAPI } from '@duna/client';

import BaseService, { ServiceConfig } from '../services/base-service';
import { AuthService } from '../services/auth';
import { CardService } from '../services/payment';
import CartService from '../services/cart/service';
import { AddressService } from '../services/address';

import { CheckoutConfig, Services } from './interfaces';
import Context from './context';
import { Environment, OrderResponse } from '..';
import { envs } from '../d-una-environment';
import { Endpoints } from '../endpoints';
import MerchantService from '../services/merchant/service';
import { ErrorsCode } from '../utils/errros';
import { StateJson } from './state';

export default class Checkout {
  private static services: Services;
  private static context: Context;

  private static initServices(
    baseConfig: Omit<ServiceConfig, 'endpoint'>
  ): BaseService[] {
    const auth = new AuthService({
      ...baseConfig,
      endpoint: Endpoints.User
    });

    const address = new AddressService({
      ...baseConfig,
      endpoint: Endpoints.Addresses
    });

    const card = new CardService({
      ...baseConfig,
      endpoint: Endpoints.Cards
    });

    const cart = new CartService({
      ...baseConfig,
      endpoint: Endpoints.Merchants
    });

    const merchant = new MerchantService({
      ...baseConfig,
      endpoint: Endpoints.Merchants
    });

    return [auth, address, card, cart, merchant];
  }

  private static buildMethods(services: BaseService[]) {
    const methods = {} as Services;
    for (const service of services) {
      for (const fnName of Object.getOwnPropertyNames(
        Object.getPrototypeOf(service)
      )) {
        if (fnName !== 'constructor') {
          methods[fnName] = service[fnName].bind(service);
        }
      }
    }

    return methods;
  }

  static getInstance() {
    return this.services;
  }

  static getInstanceJSON() {
    const state = this.context.getState();
    return {
      ...state,
      client: JSON.parse(JSON.stringify(state.client))
    };
  }

  static setInstanceJson(instanceJson: StateJson) {
    const clientInstanceJson = instanceJson.client;
    const client = new ClientAPI('api-gateway', clientInstanceJson.baseURL);
    client.setTimeout(60000);
    client.setHeaders(clientInstanceJson.headers);
    client.setToken(clientInstanceJson.token);

    this.context = new Context({
      ...instanceJson,
      client
    });

    const services = this.initServices({
      apiKey: '',
      authToken: '',
      context: this.context
    });

    this.services = this.buildMethods(services);
  }

  static setInstance(services: Services) {
    this.services = services;
  }

  private static async auth(
    client: ClientAPI,
    securityValue?: { authToken?: string; deviceId?: string }
  ) {
    const { error } = await this.services.getMerchant();

    if (error) {
      throw new Error(ErrorsCode.CantAuthMerchant);
    }

    let authToken = securityValue?.authToken || '';
    if (securityValue?.deviceId) {
      const { data, error } = await this.services.loginWithDeviceFingerprint();

      if (!error && data) {
        authToken = data.token;
      }
    }

    if (authToken) {
      client.setToken(authToken);
      const { error } = await this.services.getUser();

      if (error) {
        await this.services.createGuestToken();
      }
    } else {
      await this.services.createGuestToken();
    }
  }

  static async init({
    apiKey,
    env = Environment.Production,
    deviceId,
    sessionId,
    authToken
  }: CheckoutConfig): Promise<Services> {
    const baseUrl = envs[env];

    const deviceIdHeader = { ...(deviceId ? { 'X-Device-Id': deviceId } : {}) };
    const sessionIdHeader = {
      ...(deviceId ? { 'X-Session-ID': sessionId } : {})
    };

    const client = new ClientAPI('api-gateway', baseUrl);
    client.setTimeout(60000);
    client.setHeaders({
      'X-API-KEY': apiKey,
      ...deviceIdHeader,
      ...sessionIdHeader
    });

    this.context = new Context({
      client,
      order: {} as OrderResponse
    });

    const baseConfig = {
      apiKey,
      authToken: '',
      context: this.context
    };
    const services = this.initServices(baseConfig);

    this.services = this.buildMethods(services);

    await this.auth(client, { authToken, deviceId });

    return this.services;
  }
}
