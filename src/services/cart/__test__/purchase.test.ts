import { ClientAPI } from '@duna/client';

import { Environment, envs } from '../../../d-una-environment';

import Context from '../../../checkout/context';

import CartService from '../service';

import mockData from '../__mock__/mock-data';
import { Endpoints } from '../../../endpoints';
import { ErrorsCode } from '../../../utils/errros';
import { ProcessPayPayload, OrderResponse } from '../interfaces';
import { PaymentMethodTypes } from '../..';
import { PaymentMethod } from '../../merchant';

const client = new ClientAPI('mock-client-api', envs[Environment.Staging]);
const MockAdapter = require('axios-mock-adapter');
let axiosMock: any;

const context = new Context({
  client,
  order: {} as OrderResponse
});

client.setToken('TEST_TOKEN');

const generateOrder = async () => {
  const orderToken = mockData.order.token;

  axiosMock
    .onGet(`${Endpoints.Merchants}/orders/${orderToken}`)
    .reply(function () {
      return [200, mockData.order];
    });

  const cartService = new CartService({
    apiKey: 'xxx-xxx',
    context,
    endpoint: Endpoints.Merchants
  });

  const { data: order } = await cartService.getOrderTokenized(orderToken);

  return order;
};

describe('Test Cart Service Purchase', () => {
  beforeEach(() => {
    //@ts-ignore
    axiosMock = new MockAdapter(client.client);
  });

  test('should get one order', async () => {
    const order = await generateOrder();

    if (!order) throw 'Order is null';

    try {
      const orderId = mockData.order.order.order_id;

      expect(order.getOrder().order_id).toEqual(orderId);
    } catch (error) {
      throw error;
    }
  });

  test('Purchase should fail because dosent have paymentMethod', async () => {
    const order = await generateOrder();

    if (!order) throw 'Order is null';

    order.setBillingAddress(mockData.address);

    expect(() => order.processPayment()).rejects.toThrow(
      ErrorsCode.PaymentMethodNotSet
    );
  });

  test('Should create a prushase', async () => {
    const order = await generateOrder();

    if (!order) throw 'Order is null';

    const fakeEmail = 'test@email.com';
    const paymentMethod = PaymentMethodTypes.Cash;
    const cvv = '123';

    order.setBillingAddress(mockData.address);
    order.setPaymentMethod(mockData.paymentMethod as PaymentMethod);
    order.setGuestEmail(fakeEmail);
    order.setCardTokenized(mockData.cardTokenized, cvv);

    const expectedPayload: ProcessPayPayload = {
      token: mockData.order.token,
      email: fakeEmail,
      method_type: paymentMethod,
      card_id: mockData.cardTokenized.id,
      store_code: '10',
      credit_card: {
        card_cvv: cvv
      },
      user_instructions: 'test',
      captcha_token: '2134124r12d1wd1',
      processor_name: 'cash'
    };

    axiosMock
      .onPost(`${Endpoints.Merchants}${Endpoints.Transactions}/purchase`)
      .reply(function (config: any) {
        const payload = JSON.parse(config.data) as ProcessPayPayload;

        expect(payload.token).toEqual(expectedPayload.token);
        expect(payload.email).toEqual(expectedPayload.email);
        expect(payload.card_id).toEqual(expectedPayload.card_id);
        expect(payload.credit_card).toEqual(expectedPayload.credit_card);

        return [200, mockData.orderProceess];
      });

    const { data, error } = await order.processPayment();

    expect(error).toEqual(null);
    expect(data).toEqual(mockData.orderProceess);
  });

  test('Should add set billing address', async () => {
    const order = await generateOrder();

    if (!order) throw 'Order is null';

    const orderToken = mockData.order.token;

    axiosMock
      .onPost(
        `${Endpoints.Merchants}${Endpoints.ExternalOrders}/${orderToken}/billing-address`
      )
      .reply(function (config: any) {
        return [200, {}];
      });

    const { data } = await order.setBillingAddress(mockData.address);

    expect(data).toEqual({});
  });

  test('Should apply coupon in order', async () => {
    const order = await generateOrder();

    if (!order) throw 'Order is null';

    const orderToken = mockData.order.token;

    const orderWithDiscount = {
      ...mockData.order.order,
      discounts: [mockData.discounts]
    };

    axiosMock
      .onPost(
        `${Endpoints.Merchants}${Endpoints.ExternalOrders}/${orderToken}/coupons`
      )
      .reply(function () {
        return [200, { order: orderWithDiscount }];
      });

    const { error } = await order.applyCoupon(mockData.discounts.code);

    expect(error).toEqual(null);

    expect(order.getOrder().discounts[0].code).toEqual(mockData.discounts.code);
  });

  test('Should get Shipping Methods', async () => {
    const order = await generateOrder();

    const orderToken = mockData.order.token;

    axiosMock
      .onPost(
        `${Endpoints.Merchants}${Endpoints.ExternalOrders}/${orderToken}/shipping-methods`
      )
      .reply(function () {
        return [200, { order, shipping_methods: mockData.shipping_methods }];
      });

    const { data } = await order!.getShippingMethods(mockData.address);

    expect(data?.shipping_methods).toEqual(mockData.shipping_methods);
  });

  test('Should set Shipping Method', async () => {
    const order = await generateOrder();

    if (!order) throw 'Order is null';

    const orderToken = mockData.order.token;
    const methodCode = mockData.shipping_methods[0].code;

    axiosMock
      .onPatch(
        `${Endpoints.Merchants}${Endpoints.ExternalOrders}/${orderToken}/shipping-methods/${methodCode}`
      )
      .reply(function () {
        return [200, { order: mockData.order.order }];
      });

    await order.setShippingMethod(methodCode);

    expect(order.getOrder().order_id).toBe(mockData.order.order.order_id);
  });

  test('Should remove coupon in order', async () => {
    const order = await generateOrder();

    if (!order) throw 'Order is null';

    const orderToken = mockData.order.token;

    const orderWithoutDiscount = {
      ...mockData.order.order,
      discounts: []
    };

    axiosMock
      .onDelete(
        `${Endpoints.Merchants}${Endpoints.ExternalOrders}/${orderToken}/coupons/${mockData.discounts.code}`
      )
      .reply(function () {
        return [200, { order: orderWithoutDiscount }];
      });

    const { error } = await order.removeCoupon(mockData.discounts.code);

    expect(error).toEqual(null);

    expect(order.getOrder().discounts.length).toEqual(0);
  });

  test('Should set shipping rate in order', async () => {
    const order = await generateOrder();

    if (!order) throw 'Order is null';

    const orderToken = mockData.order.token;

    axiosMock
      .onPost(
        `${Endpoints.Merchants}${Endpoints.ExternalOrders}/${orderToken}/shipping-rate`
      )
      .reply(function (config: any) {
        return [
          200,
          { order: mockData.order, shipping_rate: mockData.shipping_rate }
        ];
      });

    const { data } = await order.setShippingRate(mockData.address);

    expect(data?.success).toEqual(true);

    expect(order.getShippingRate().cost).toEqual(mockData.shipping_rate.cost);
  });

  test('Should get Installments ', async () => {
    const order = await generateOrder();

    if (!order) throw 'Order is null';

    const orderToken = mockData.order.token;
    const bin = '411111';

    axiosMock
      .onGet(
        `${Endpoints.Merchants}/transactions/orders/${orderToken}/installments`
      )
      .reply(function (config: any) {
        return [200, { installments: mockData.installments }];
      });

    const { data } = await order.getInstallments(bin);

    expect(data?.installments).toEqual(mockData.installments);
  });
});
