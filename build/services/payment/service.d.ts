import { ResponseInData } from '@duna/client';
import BaseService, { ServiceConfig } from '../base-service';
import { Card, CreateCardPayload, CardTokenized } from './interfaces';
export default class CardService extends BaseService {
    constructor(config: ServiceConfig);
    private buildEndpoint;
    createCard(payload: CreateCardPayload): Promise<import("../../utils/formatResponse").ResponseSdk<ResponseInData<CardTokenized>>>;
    getCard(cardId: string): Promise<import("../../utils/formatResponse").ResponseSdk<ResponseInData<Card>>>;
    getCards(): Promise<import("../../utils/formatResponse").ResponseSdk<ResponseInData<CardTokenized[]>>>;
    deleteCard(cardId: string): Promise<import("../../utils/formatResponse").ResponseSdk<ResponseInData<Card>>>;
}
