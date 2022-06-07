import { ClientAPI } from '@duna/client';

import { Environment, envs } from '../../../d-una-environment';

import Context from '../../../checkout/context';

import { Endpoints } from '../../../endpoints';
import mockData from '../__mock__/mock-data';
import { CreateCardPayload } from '../interfaces';
import { CardService } from '..';

const client = new ClientAPI('mock-client-api', envs[Environment.Staging]);
const MockAdapter = require('axios-mock-adapter');
let axiosMock: any;

const contextWithUser = new Context({
  client,
  order: {} as any
});
contextWithUser.setState({
  user: mockData.user
});

const contextWithoutUser = new Context({
  client,
  order: {} as any
});

describe('Test Address Service', () => {
  beforeEach(() => {
    //@ts-ignore
    axiosMock = new MockAdapter(client.client);
  });

  test('Should fail because no user set jet', async () => {
    const card = mockData.cardPayload;
    const payload: CreateCardPayload = {
      expiry_month: card.expiry_month,
      expiry_year: card.expiry_year,
      card_holder: card.card_holder,
      card_holder_dni: card.card_holder_dni,
      card_number: card.card_number,
      card_cvv: card.card_cvv,
      address1: card.address1,
      zip: card.zip,
      city: card.city,
      state: card.state,
      country: card.country,
      phone: card.phone
    };

    const cardService = new CardService({
      apiKey: 'xxx-xxx',
      context: contextWithoutUser,
      endpoint: Endpoints.Cards
    });

    const { data, error } = await cardService.createCard(payload);

    if (error && !data) {
      return expect(error.error).toEqual({
        code: 'Error',
        message: 'User is not set'
      });
    }

    throw 'Error';
  });

  test('Should create a new Card', async () => {
    const card = mockData.cardPayload;
    const payload: CreateCardPayload = {
      expiry_month: card.expiry_month,
      expiry_year: card.expiry_year,
      card_holder: card.card_holder,
      card_holder_dni: card.card_holder_dni,
      card_number: card.card_number,
      card_cvv: card.card_cvv,
      address1: card.address1,
      zip: card.zip,
      city: card.city,
      state: card.state,
      country: card.country,
      phone: card.phone
    };

    axiosMock
      .onPost(`${Endpoints.User}/${mockData.user.id}${Endpoints.Cards}`)
      .reply(function () {
        return [200, { ...mockData.createCardResponse }];
      });

    const cardService = new CardService({
      apiKey: 'xxx-xxx',
      context: contextWithUser,
      endpoint: Endpoints.Cards
    });

    const response = await cardService.createCard(payload);

    expect(response.data).toEqual(mockData.createCardResponse);
  });

  test('Should delete a Card', async () => {
    const id = mockData.createCardResponse.data.id;

    axiosMock
      .onDelete(`${Endpoints.User}/${mockData.user.id}${Endpoints.Cards}/${id}`)
      .reply(function () {
        return [204, ''];
      });

    const cardService = new CardService({
      apiKey: 'xxx-xxx',
      context: contextWithUser,
      endpoint: Endpoints.Cards
    });

    const { data } = await cardService.deleteCard(id);

    expect(data).toEqual({ success: true });
  });

  test('Should get all cards', async () => {
    const userId = mockData.user.id;

    axiosMock
      .onGet(`${Endpoints.User}/${userId}${Endpoints.Cards}`)
      .reply(function () {
        return [200, mockData.cards];
      });

    const cardService = new CardService({
      apiKey: 'xxx-xxx',
      context: contextWithUser,
      endpoint: Endpoints.Cards
    });

    const response = await cardService.getCards();

    expect(response.data?.data).toEqual(mockData.cards.data);
  });

  test('Should get one card', async () => {
    const userId = mockData.user.id;

    axiosMock
      .onGet(
        `${Endpoints.User}/${userId}${Endpoints.Cards}/${mockData.oneCard.id}`
      )
      .reply(function () {
        return [200, { data: mockData.oneCard.data }];
      });

    const cardService = new CardService({
      apiKey: 'xxx-xxx',
      context: contextWithUser,
      endpoint: Endpoints.Cards
    });

    const response = await cardService.getCard(mockData.oneCard.id);

    expect(response.data?.data).toEqual(mockData.oneCard.data);
  });
});
