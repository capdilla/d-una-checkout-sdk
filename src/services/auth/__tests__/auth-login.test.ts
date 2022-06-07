import { ClientAPI } from '@duna/client';
import { Endpoints } from '../../../endpoints';

import { Environment, envs } from '../../../d-una-environment';
import { AuthService } from '../index';
import mockData from '../__mock__/mock-data';
import { OtpType } from '../interfaces';
import Context from '../../../checkout/context';

const client = new ClientAPI('mock-client-api', envs[Environment.Staging]);
const MockAdapter = require('axios-mock-adapter');
let axiosMock: any;

const context = new Context({
  client,
  order: {} as any
});

describe('Test Auth Service as Login User', () => {
  beforeEach(() => {
    //@ts-ignore
    axiosMock = new MockAdapter(client.client);
  });

  test('Should send OTP Email', async () => {
    axiosMock.onPost(`${Endpoints.User}/request-code`).reply(function () {
      return [200, ''];
    });

    const authService = new AuthService({
      apiKey: 'xxx-xxx',
      authToken: '',
      context,
      endpoint: Endpoints.User
    });

    const { data, error } = await authService.sendOtpToEmail(mockData.email);

    if (data && !error) {
      expect(data.success).toBe(true);
    } else {
      throw error;
    }
  });

  test('Should Fail Request OTP SMS', async () => {
    axiosMock.onPost(`${Endpoints.User}/request-code`).reply(function () {
      return [400, ''];
    });

    const authService = new AuthService({
      apiKey: 'xxx-xxx',
      authToken: '',
      context,
      endpoint: Endpoints.User
    });

    const { data, error } = await authService.sendOtpToSMS(mockData.email);

    if (error) {
      expect(error.error.code).toBe('400');
    } else {
      throw data;
    }
  });

  test('Should Login with OTP', async () => {
    axiosMock.onPost(`${Endpoints.User}/login`).reply(function () {
      return [
        200,
        {
          token: mockData.tokens.tokenOTP
        }
      ];
    });

    const authService = new AuthService({
      apiKey: 'xxx-xxx',
      authToken: '',
      context,
      endpoint: Endpoints.User
    });

    const { data, error } = await authService.loginWithOtp(
      mockData.email,
      mockData.otp,
      OtpType.Email
    );

    if (data && !error) {
      expect(data.token).toBe(mockData.tokens.tokenOTP);
      //@ts-ignore
      expect(client.token).toBe(mockData.tokens.tokenOTP);
    } else {
      throw error;
    }
  });

  test('Should Change Password', async () => {
    axiosMock.onPost(`${Endpoints.User}/change-password`).reply(function () {
      return [
        200,
        {
          token: mockData.tokens.tokenChangePassword
        }
      ];
    });

    const authService = new AuthService({
      apiKey: 'xxx-xxx',
      authToken: '',
      context,
      endpoint: Endpoints.User
    });

    const { data, error } = await authService.changePassword({
      email: mockData.email,
      otp: mockData.otp,
      password: mockData.password
    });

    if (data && !error) {
      expect(data.token).toBe(mockData.tokens.tokenChangePassword);
      //@ts-ignore
      expect(client.token).toBe(mockData.tokens.tokenChangePassword);
    } else {
      throw error;
    }
  });

  test('Should Login With Email and Password', async () => {
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

    const { data, error } = await authService.loginWithEmailPassword(
      mockData.email,
      mockData.password
    );

    if (data && !error) {
      expect(data.token).toBe(mockData.tokens.tokenTest);
      //@ts-ignore
      expect(client.token).toBe(mockData.tokens.tokenTest);
    } else {
      throw error;
    }
  });

  test('Should Get User Info', async () => {
    axiosMock.onGet(`${Endpoints.User}/me`).reply(function (config: any) {
      expect(config.headers.Authorization).toBe(
        `Bearer ${mockData.tokens.tokenTest}`
      );

      return [200, mockData.user];
    });

    const authService = new AuthService({
      apiKey: 'xxx-xxx',
      authToken: '',
      context,
      endpoint: Endpoints.User
    });

    const { data, error } = await authService.getUser();

    if (data && !error) {
      expect(typeof data.id).toBe('string');
    } else {
      throw error;
    }
  });
});
