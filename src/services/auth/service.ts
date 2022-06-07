import { isErrorResponse, Response200 } from '@duna/client';
import { OtpType } from '.';
import { formatReponse } from '../../utils/formatResponse';
import { generateUUID } from '../../utils/generateUUID';

import BaseService, { ServiceConfig } from '../base-service';
import {
  CreateGuestTokenPayload,
  CreateGuestTokenRequest,
  CreateUserPayload,
  CreateUserResponse,
  EditUserPayload,
  ChangePasswordPayload,
  ChangePasswordResponse,
  LoginWithEmailPasswordPayload,
  LoginWithOtpPayload,
  RequestOtpParams,
  RequestOtpPayload,
  User
} from './interfaces';

export default class AuthService extends BaseService {
  constructor(config: ServiceConfig) {
    super(config);
  }

  /**
   * use to refetch the user
   * @returns
   */
  async refetchUser() {
    const response = await this.getClient().get<User>(
      `${this.config.endpoint}/me`
    );

    if (!isErrorResponse(response)) {
      this.config.context.setState({ user: response });
    }

    return formatReponse<User>(response);
  }

  async getUser() {
    const userContext = this.config.context.getState().user;
    if (userContext) {
      return formatReponse<User>(userContext);
    }

    return this.refetchUser();
  }

  async userExist(email: string) {
    const response = await this.getClient().get<Response200>(
      `${this.config.endpoint}`,
      { params: { email } }
    );

    if (!isErrorResponse(response)) {
      return formatReponse<Response200>({ success: true });
    }

    return formatReponse<Response200>(response);
  }

  private async login(
    payload:
      | CreateGuestTokenPayload
      | LoginWithEmailPasswordPayload
      | LoginWithOtpPayload
      | Record<string, unknown>,
    params?: { type?: string }
  ) {
    const response = await this.getClient().post<CreateGuestTokenRequest>(
      `${this.config.endpoint}/login`,
      payload,
      { params }
    );

    if (!isErrorResponse(response)) {
      this.getClient().setToken(response.token);
      await this.refetchUser();
    }

    return formatReponse<CreateGuestTokenRequest>(response);
  }

  async signOut() {
    const response = await this.getClient().post<Response200>(
      `${this.config.endpoint}/logout`
    );

    if (!isErrorResponse(response)) {
      await this.createGuestToken();
    }

    return formatReponse<Response200>(response);
  }

  async createGuestToken() {
    const payload: CreateGuestTokenPayload = {
      user_id: generateUUID()
    };
    return this.login(payload, { type: 'guest' });
  }

  async loginWithEmailPassword(email: string, password: string) {
    return this.login({ email, password });
  }

  async loginWithOtp(email: string, otpCode: string, otpType: OtpType) {
    return this.login({ email, otp: otpCode }, { type: otpType });
  }

  async loginWithDeviceFingerprint() {
    const response = await this.getClient().post<CreateGuestTokenRequest>(
      `${this.config.endpoint}/login/device-fingerprint`
    );

    if (!isErrorResponse(response)) {
      this.getClient().setToken(response.token);
      await this.refetchUser();
    }

    return formatReponse<CreateGuestTokenRequest>(response);
  }

  private async sendOtp(payload: RequestOtpPayload, params?: RequestOtpParams) {
    const response = await this.getClient().post<Response200>(
      `${this.config.endpoint}/request-code`,
      payload,
      { params }
    );

    if (!isErrorResponse(response)) {
      return formatReponse<Response200>({ success: true });
    }

    return formatReponse<Response200>(response);
  }

  async sendOtpToEmail(email: string) {
    return this.sendOtp({ email }, { type: OtpType.Email });
  }

  async sendOtpToSMS(email: string) {
    return this.sendOtp({ email }, { type: OtpType.Sms });
  }

  async createUser(payload: CreateUserPayload) {
    const response = await this.getClient().post<CreateUserResponse>(
      `${this.config.endpoint}/register`,
      payload
    );

    if (!isErrorResponse(response)) {
      this.getClient().setToken(response.token);
      await this.refetchUser();
    }

    return formatReponse<CreateUserResponse>(response);
  }

  async editUser(userId: string, payload: EditUserPayload) {
    const response = await this.getClient().patch<Response200>(
      `${this.config.endpoint}/${userId}`,
      payload
    );

    return formatReponse<Response200>(response);
  }

  async changePassword(payload: ChangePasswordPayload) {
    const response = await this.getClient().post<ChangePasswordResponse>(
      `${this.config.endpoint}/change-password`,
      payload
    );

    if (!isErrorResponse(response)) {
      this.getClient().setToken(response.token);
      await this.refetchUser();
    }

    return formatReponse<ChangePasswordResponse>(response);
  }
}
