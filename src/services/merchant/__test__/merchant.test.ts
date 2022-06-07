import { ClientAPI } from '@duna/client';

import { Environment, envs } from '../../../d-una-environment';

import Context from '../../../checkout/context';

import mockData from '../__mock__/mock-data';
import { OrderResponse } from '../..';
import { Endpoints } from '../../../endpoints';
import MerchantService from '../service';
import { ErrorsCode } from '../../../utils/errros';
import { Merchant } from '..';

const client = new ClientAPI('mock-client-api', envs[Environment.Staging]);
const MockAdapter = require('axios-mock-adapter');
let axiosMock: any;

const context = new Context({
  client,
  order: {} as OrderResponse
});

client.setToken('TEST_TOKEN');

const merchantService = new MerchantService({
  context,
  apiKey: 'xxx-xx',
  endpoint: Endpoints.Merchants
});

describe('Test Merchant info', () => {
  beforeEach(() => {
    //@ts-ignore
    axiosMock = new MockAdapter(client.client);
  });

  test('should return merchant info', async () => {
    axiosMock.onGet(`${Endpoints.Merchants}`).reply(function () {
      return [200, mockData.merchant];
    });

    axiosMock.onGet(`/checkout`).reply(function () {
      return [200, mockData.merchantConfig];
    });

    const expectedResponse: Merchant = {
      ...mockData.merchant,
      merchant_config: mockData.merchantConfig
    };

    const { data } = await merchantService.getMerchant();

    expect(data).toEqual(expectedResponse);
    expect(context.getState().merchant).toEqual(expectedResponse);
  });

  test('should fail paymentMethods', async () => {
    axiosMock
      .onGet(`${Endpoints.Transactions}/payments-methods`)
      .reply(function () {
        return [200, mockData.paymentMethods];
      });

    const { error } = await merchantService.getPaymentMethods();

    expect(error?.error.message).toEqual(
      ErrorsCode.StoreCodeNotFoundPaymentMethods
    );
  });

  test('should return paymentMethods', async () => {
    const orderToken = 'TEST_TOKEN';
    context.setState({ order: { token: orderToken } } as any);
    axiosMock
      .onGet(`${Endpoints.Merchants}/orders/${orderToken}/payments-methods`)
      .reply(function () {
        return [200, mockData.paymentMethods];
      });

    const { data } = await merchantService.getPaymentMethods();

    expect(data).toEqual(mockData.paymentMethods);
  });
});
