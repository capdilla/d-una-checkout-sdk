import { ResponseInData } from '@duna/client';
import { Endpoints } from '../../endpoints';

import { formatReponse } from '../../utils/formatResponse';
import BaseService, { ServiceConfig } from '../base-service';
import { Card, CreateCardPayload, CardTokenized } from './interfaces';

export default class CardService extends BaseService {
  constructor(config: ServiceConfig) {
    super(config);
  }

  private buildEndpoint() {
    const user = this.getAuthUser();
    if (!user) return '';

    const userId = user.id;

    return `${Endpoints.User}/${userId}${this.config.endpoint}`;
  }

  async createCard(payload: CreateCardPayload) {
    const response =
      this.isUserSet() ||
      this.getClient().post<ResponseInData<CardTokenized>>(
        `${this.buildEndpoint()}`,
        payload
      );

    return formatReponse<ResponseInData<CardTokenized>>(await response);
  }

  async getCard(cardId: string) {
    const response =
      this.isUserSet() ||
      this.getClient().get<ResponseInData<Card>>(
        `${this.buildEndpoint()}/${cardId}`
      );

    return formatReponse<ResponseInData<Card>>(await response);
  }

  async getCards() {
    const response =
      this.isUserSet() ||
      this.getClient().get<ResponseInData<CardTokenized[]>>(
        `${this.buildEndpoint()}`
      );

    return formatReponse<ResponseInData<CardTokenized[]>>(await response);
  }

  async deleteCard(cardId: string) {
    const response =
      this.isUserSet() ||
      this.getClient().delete<ResponseInData<Card>>(
        `${this.buildEndpoint()}/${cardId}`
      );

    return formatReponse<ResponseInData<Card>>(await response);
  }
}
