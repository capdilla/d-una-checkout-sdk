import { ClientAPI } from '@duna/client';

import { Environment, envs } from '../../../d-una-environment';

import Context from '../../../checkout/context';
import { AddressService, AddressPayload } from '..';
import { Endpoints } from '../../../endpoints';
import mockData from '../__mock__/mock-data';

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
    const address = mockData.address[0];
    const payload: AddressPayload = {
      first_name: address.first_name,
      last_name: address.last_name,
      phone: address.phone,
      identity_document: address.identity_document,
      lat: address.lat,
      lng: address.lng,
      address1: address.address1,
      address2: address.address2,
      city: address.city,
      zipcode: address.zipcode,
      state_name: address.state_name,
      state_code: address.state_name,
      country: address.country,
      additional_description: address.additional_description,
      address_type: address.address_type,
      is_default: address.is_default,
      is_billing_address: true
    };

    const addressService = new AddressService({
      apiKey: 'xxx-xxx',
      context: contextWithoutUser,
      endpoint: Endpoints.Addresses
    });

    const { data, error } = await addressService.createAddress(payload);

    if (error && !data) {
      return expect(error.error).toEqual({
        code: 'Error',
        message: 'User is not set'
      });
    }

    throw 'Error';
  });

  test('Should create a new Address', async () => {
    const address = mockData.address[0];
    const payload: AddressPayload = {
      first_name: address.first_name,
      last_name: address.last_name,
      phone: address.phone,
      identity_document: address.identity_document,
      lat: address.lat,
      lng: address.lng,
      address1: address.address1,
      address2: address.address2,
      city: address.city,
      zipcode: address.zipcode,
      state_name: address.state_name,
      state_code: address.state_name,
      country: address.country,
      additional_description: address.additional_description,
      address_type: address.address_type,
      is_default: address.is_default,
      is_billing_address: false
    };

    axiosMock
      .onPost(`${Endpoints.User}/${address.user_id}${Endpoints.Addresses}`)
      .reply(function () {
        return [200, { ...address }];
      });

    const addressService = new AddressService({
      apiKey: 'xxx-xxx',
      context: contextWithUser,
      endpoint: Endpoints.Addresses
    });

    const response = await addressService.createAddress(payload);

    expect(response.data).toEqual(address);
  });

  test('Should edit an address', async () => {
    const address = mockData.address[0];
    const id = address.id;

    const payload: AddressPayload = {
      first_name: address.first_name,
      last_name: address.last_name,
      phone: address.phone,
      identity_document: address.identity_document,
      lat: address.lat,
      lng: address.lng,
      address1: address.address1,
      address2: address.address2,
      city: address.city,
      zipcode: address.zipcode,
      state_name: address.state_name,
      state_code: address.state_name,
      country: address.country,
      additional_description: address.additional_description,
      address_type: address.address_type,
      is_default: address.is_default,
      is_billing_address: false
    };

    axiosMock
      .onPatch(
        `${Endpoints.User}/${address.user_id}${Endpoints.Addresses}/${id}`
      )
      .reply(function () {
        return [200, { ...address }];
      });

    const addressService = new AddressService({
      apiKey: 'xxx-xxx',
      context: contextWithUser,
      endpoint: Endpoints.Addresses
    });

    const response = await addressService.editAddress(id, payload);

    expect(response.data).toEqual(address);
  });

  test('Should delete an address', async () => {
    const address = mockData.address[0];
    const id = address.id;

    axiosMock
      .onDelete(
        `${Endpoints.User}/${address.user_id}${Endpoints.Addresses}/${id}`
      )
      .reply(function () {
        return [204, ''];
      });

    const addressService = new AddressService({
      apiKey: 'xxx-xxx',
      context: contextWithUser,
      endpoint: Endpoints.Addresses
    });

    const response = await addressService.deleteAddress(id);

    expect(response.data).toEqual({ success: true });
  });

  test('Should get all address', async () => {
    const address = mockData.address[0];

    axiosMock
      .onGet(`${Endpoints.User}/${address.user_id}${Endpoints.Addresses}`)
      .reply(function () {
        return [200, { data: mockData.address }];
      });

    const addressService = new AddressService({
      apiKey: 'xxx-xxx',
      context: contextWithUser,
      endpoint: Endpoints.Addresses
    });

    const response = await addressService.getAddresses();

    expect(response.data).toEqual({ data: mockData.address });
  });
});
