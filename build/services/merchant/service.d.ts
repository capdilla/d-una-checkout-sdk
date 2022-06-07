import { ResponseInData } from '@duna/client';
import { Merchant, PaymentMethod } from '.';
import BaseService, { ServiceConfig } from '../base-service';
export default class MerchantService extends BaseService {
    constructor(config: ServiceConfig);
    private fetchMerchant;
    private merchantState;
    getMerchant(): Promise<import("../../utils/formatResponse").ResponseSdk<Merchant>>;
    getPaymentMethods(): Promise<import("../../utils/formatResponse").ResponseSdk<ResponseInData<PaymentMethod[]>>>;
}
