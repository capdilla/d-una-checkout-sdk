import {
  isErrorResponse,
  makeErrorResponse,
  ResponseInData
} from '@duna/client';
import { Merchant, MerchantConfig, PaymentMethod } from '.';
import { Endpoints } from '../../endpoints';
import { ErrorsCode } from '../../utils/errros';
import { formatReponse } from '../../utils/formatResponse';
import BaseService, { ServiceConfig } from '../base-service';

export default class MerchantService extends BaseService {
  constructor(config: ServiceConfig) {
    super(config);
  }

  private async fetchMerchant() {
    const response = await this.getClient().get<
      Omit<Merchant, 'merchant_config'>
    >(`${this.config.endpoint}`);

    const merchantConfigResponse = await this.getClient().get<MerchantConfig>(
      `/checkout`
    );

    if (
      !isErrorResponse(response) &&
      !isErrorResponse(merchantConfigResponse)
    ) {
      const merchant: Merchant = {
        ...response,
        merchant_config: merchantConfigResponse
      };
      this.config.context.setState({ merchant });

      return formatReponse<Merchant>(merchant);
    }

    if (isErrorResponse(merchantConfigResponse)) {
      formatReponse<Merchant>(merchantConfigResponse);
    }

    return formatReponse<Merchant>(response);
  }

  private merchantState() {
    return this.config.context.getState().merchant;
  }

  getMerchant() {
    const merchant = this.merchantState();
    if (!merchant) {
      return this.fetchMerchant();
    }

    return formatReponse(merchant);
  }

  async getPaymentMethods() {
    type Response = ResponseInData<PaymentMethod[]>;
    const order = this.config.context.getState().order;

    if (!order)
      return formatReponse<Response>(
        makeErrorResponse(new Error(ErrorsCode.OrderNotFound))
      );

    const orderToken = order?.token;
    if (!orderToken)
      return formatReponse<Response>(
        makeErrorResponse(new Error(ErrorsCode.StoreCodeNotFoundPaymentMethods))
      );

    const response = await this.getClient().get<Response>(
      `${Endpoints.Merchants}/orders/${orderToken}/payments-methods`
    );

    return formatReponse(response);
  }
}
