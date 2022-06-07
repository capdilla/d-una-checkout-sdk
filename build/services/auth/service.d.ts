import { Response200 } from '@duna/client';
import { OtpType } from '.';
import BaseService, { ServiceConfig } from '../base-service';
import { CreateGuestTokenRequest, CreateUserPayload, CreateUserResponse, EditUserPayload, ChangePasswordPayload, ChangePasswordResponse, User } from './interfaces';
export default class AuthService extends BaseService {
    constructor(config: ServiceConfig);
    /**
     * use to refetch the user
     * @returns
     */
    refetchUser(): Promise<import("../../utils/formatResponse").ResponseSdk<User>>;
    getUser(): Promise<import("../../utils/formatResponse").ResponseSdk<User>>;
    userExist(email: string): Promise<import("../../utils/formatResponse").ResponseSdk<Response200>>;
    private login;
    signOut(): Promise<import("../../utils/formatResponse").ResponseSdk<Response200>>;
    createGuestToken(): Promise<import("../../utils/formatResponse").ResponseSdk<CreateGuestTokenRequest>>;
    loginWithEmailPassword(email: string, password: string): Promise<import("../../utils/formatResponse").ResponseSdk<CreateGuestTokenRequest>>;
    loginWithOtp(email: string, otpCode: string, otpType: OtpType): Promise<import("../../utils/formatResponse").ResponseSdk<CreateGuestTokenRequest>>;
    loginWithDeviceFingerprint(): Promise<import("../../utils/formatResponse").ResponseSdk<CreateGuestTokenRequest>>;
    private sendOtp;
    sendOtpToEmail(email: string): Promise<import("../../utils/formatResponse").ResponseSdk<Response200>>;
    sendOtpToSMS(email: string): Promise<import("../../utils/formatResponse").ResponseSdk<Response200>>;
    createUser(payload: CreateUserPayload): Promise<import("../../utils/formatResponse").ResponseSdk<CreateUserResponse>>;
    editUser(userId: string, payload: EditUserPayload): Promise<import("../../utils/formatResponse").ResponseSdk<Response200>>;
    changePassword(payload: ChangePasswordPayload): Promise<import("../../utils/formatResponse").ResponseSdk<ChangePasswordResponse>>;
}
