import { ResponseInData, Response200 } from '@duna/client';
import { Endpoints } from '../../endpoints';
import { formatReponse } from '../../utils/formatResponse';

import BaseService, { ServiceConfig } from '../base-service';
import { AddressPayload, Address } from './interfaces';

export default class AddressService extends BaseService {
  constructor(config: ServiceConfig) {
    super(config);
  }

  private buildEndpoint() {
    const user = this.getAuthUser();
    if (!user) return '';

    const userId = user.id;

    return `${Endpoints.User}/${userId}${Endpoints.Addresses}`;
  }

  async createAddress(payload: AddressPayload) {
    const response =
      this.isUserSet() ||
      this.getClient().post<Address>(this.buildEndpoint(), payload);

    return formatReponse<Address>(await response);
  }

  async getAddresses() {
    const response =
      this.isUserSet() ||
      this.getClient().get<ResponseInData<Address[]>>(
        `${this.buildEndpoint()}`
      );

    return formatReponse<ResponseInData<Address[]>>(await response);
  }

  async editAddress(id: number, payload: AddressPayload) {
    const response =
      this.isUserSet() ||
      this.getClient().patch<Address>(`${this.buildEndpoint()}/${id}`, payload);

    return formatReponse<Address>(await response);
  }

  async deleteAddress(id: number) {
    const response =
      this.isUserSet() ||
      this.getClient().delete<Response200>(`${this.buildEndpoint()}/${id}`);

    return formatReponse<Response200>(await response);
  }
}
