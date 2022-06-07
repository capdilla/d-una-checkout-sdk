import BaseService, { ServiceConfig } from '../base-service';
import OrderModel from './order-model';
export default class CartService extends BaseService {
    constructor(config: ServiceConfig);
    getCurrentOrder(): OrderModel;
    getOrderTokenized(orderToken: string): Promise<import("../../utils/formatResponse").ResponseSdk<OrderModel>>;
}
