import { makeErrorResponse } from '@duna/client';
import Context from '../checkout/context';

export interface ServiceConfig {
  endpoint: string;
  apiKey: string;
  authToken?: string;
  context: Context;
}

class BaseService {
  protected config: ServiceConfig;

  constructor(cfg: ServiceConfig) {
    this.config = cfg;
  }

  protected getClient() {
    return this.config.context.getState().client;
  }

  protected getAuthUser() {
    return this.config.context.getState().user;
  }

  protected isUserSet() {
    if (!this.getAuthUser()) {
      return makeErrorResponse(new Error('User is not set'));
    }

    return null;
  }
}

export default BaseService;
