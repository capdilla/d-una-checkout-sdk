import { ResponseInData, Response200 } from '@duna/client';
import BaseService, { ServiceConfig } from '../base-service';
import { AddressPayload, Address } from './interfaces';
export default class AddressService extends BaseService {
    constructor(config: ServiceConfig);
    private buildEndpoint;
    createAddress(payload: AddressPayload): Promise<import("../../utils/formatResponse").ResponseSdk<Address>>;
    getAddresses(): Promise<import("../../utils/formatResponse").ResponseSdk<ResponseInData<Address[]>>>;
    editAddress(id: number, payload: AddressPayload): Promise<import("../../utils/formatResponse").ResponseSdk<Address>>;
    deleteAddress(id: number): Promise<import("../../utils/formatResponse").ResponseSdk<Response200>>;
}
