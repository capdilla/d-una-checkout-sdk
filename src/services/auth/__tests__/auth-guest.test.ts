import { ClientAPI } from '@duna/client';
import { Endpoints } from '../../../endpoints';

import { Environment, envs } from '../../../d-una-environment';
import { AuthService } from '../index';
import mockData from '../__mock__/mock-data';
import Context from '../../../checkout/context';

const client = new ClientAPI('mock-client-api', envs[Environment.Staging]);
const MockAdapter = require('axios-mock-adapter');
let axiosMock: any;

const context = new Context({
  client,
  order: {} as any
});

describe('Test Auth Service as Guest User', () => {
  beforeEach(() => {
    //@ts-ignore
    axiosMock = new MockAdapter(client.client);
  });

  test('Should Create guest token', async () => {
    axiosMock.onPost(`${Endpoints.User}/login`).reply(function () {
      return [
        200,
        {
          token: mockData.tokens.tokenTest
        }
      ];
    });

    const authService = new AuthService({
      apiKey: 'xxx-xxx',
      authToken: '',
      context,
      endpoint: Endpoints.User
    });

    const { data, error } = await authService.createGuestToken();

    if (data && !error) {
      //@ts-ignore
      expect(client.token).toBe(mockData.tokens.tokenTest);
      expect(typeof data.token).toBe('string');
    } else {
      throw 'error';
    }
  });

  test('Should Create a new User', async () => {
    axiosMock
      .onPost(`${Endpoints.User}/register`)
      .reply(function (config: any) {
        expect(config.headers.Authorization).toBe(
          `Bearer ${mockData.tokens.tokenTest}`
        );

        return [
          200,
          {
            token: mockData.tokens.tokenUserCreated,
            user_id: 'user_id'
          }
        ];
      });

    const authService = new AuthService({
      apiKey: 'xxx-xxx',
      authToken: '',
      context,
      endpoint: Endpoints.User
    });

    const { data, error } = await authService.createUser({
      email: `$test_email@gmail.com`,
      first_name: 'John',
      last_name: 'Doe',
      phone: '+34333',
      identity_document: '1-1'
    });

    if (data && !error) {
      expect(typeof data.token).toBe('string');
      expect(typeof data.user_id).toBe('string');

      //@ts-ignore
      expect(client.token).toBe(mockData.tokens.tokenUserCreated);
    } else {
      throw 'Error';
    }
  });

  test('Should Check if user exits', async () => {
    axiosMock.onGet(`${Endpoints.User}`).reply(function (config: any) {
      return [204, ''];
    });

    const authService = new AuthService({
      apiKey: 'xxx-xxx',
      authToken: '',
      context,
      endpoint: Endpoints.User
    });

    const { data, error } = await authService.userExist(
      '$test_email@gmail.com'
    );

    if (data && !error) {
      expect(data.success).toEqual(true);
    } else {
      throw 'Error';
    }
  });

  test('Should Check if user not exits', async () => {
    axiosMock.onGet(`${Endpoints.User}`).reply(function (config: any) {
      return [
        404,
        {
          code: 'error.user_not_found',
          message: 'user not found'
        }
      ];
    });

    const authService = new AuthService({
      apiKey: 'xxx-xxx',
      authToken: '',
      context,
      endpoint: Endpoints.User
    });

    const { error } = await authService.userExist('$test_email@gmail.com');

    if (error) {
      expect(error.error).toEqual({
        code: 'error.user_not_found',
        message: 'user not found'
      });
    } else {
      throw 'Error';
    }
  });
});
