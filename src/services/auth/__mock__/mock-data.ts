const mockData = {
  email: 'test-sdk@getduna.com',
  otp: '123664',
  password: '123456Ad!',
  uuid: '3ea8aff0-c739-4c51-9add-72100620a86e',
  tokens: {
    tokenTest: 'TEST_TOKEN',
    tokenUserCreated: 'TEST_TOKEN_USER_CREATED',
    tokenOTP: 'TEST_TOKEN_OTP',
    tokenChangePassword: 'TOKEN_CHANGE_PASSWORD'
  },
  user: {
    id: '53f5c177-95d8-4236-95dd-391743acf008',
    created_at: '2021-05-13T23:59:23.599756Z',
    updated_at: '2021-05-13T23:59:23.59981Z',
    deleted_at: null,
    email: 'test-sdk@getduna.com',
    first_name: 'John',
    last_name: 'Doe',
    phone: 'undefined 123123',
    identity_document: '12313123',
    identity_providers: [
      {
        id: 136,
        provider_name: 'auth0-email-passwordless',
        created_at: '2021-06-04T17:55:09.60898Z',
        updated_at: '2021-06-04T17:55:09.60898Z',
        deleted_at: null
      },
      {
        id: 279,
        provider_name: 'auth0-email-password',
        created_at: '2021-06-22T18:25:50.392424Z',
        updated_at: '2021-06-22T18:25:50.392446Z',
        deleted_at: null
      }
    ],
    is_phone_verified: false,
    merchant_id: '8f5f0fcd-a640-4925-b17e-e72516a4c27b',
    is_guest: false
  }
};

export default mockData;
