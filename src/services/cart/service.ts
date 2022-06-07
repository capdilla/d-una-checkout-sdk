import { isErrorResponse } from '@duna/client';

import { Endpoints } from '../../endpoints';

import { formatReponse } from '../../utils/formatResponse';

import BaseService, { ServiceConfig } from '../base-service';
import { OrderResponse } from './interfaces';
import OrderModel from './order-model';
export default class CartService extends BaseService {
  constructor(config: ServiceConfig) {
    super(config);
  }

  getCurrentOrder() {
    return new OrderModel(this.config.context.getState().order, this.config);
  }

  async getOrderTokenized(orderToken: string) {
    const response = await this.getClient().get<OrderResponse>(
      `${Endpoints.Merchants}/orders/${orderToken}`
    );

    if (isErrorResponse(response)) {
      return formatReponse<OrderModel>(response);
    }

    return formatReponse<OrderModel>(new OrderModel(response, this.config));
  }
}
