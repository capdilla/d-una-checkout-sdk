const mockData = {
  user: {
    id: '53f5c177-95d8-4236-95dd-391743acf008',
    created_at: '2021-05-13T23:59:23.599756Z',
    updated_at: '2021-05-13T23:59:23.59981Z',
    deleted_at: '',
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
        deleted_at: ''
      },
      {
        id: 279,
        provider_name: 'auth0-email-password',
        created_at: '2021-06-22T18:25:50.392424Z',
        updated_at: '2021-06-22T18:25:50.392446Z',
        deleted_at: ''
      }
    ],
    is_phone_verified: false,
    merchant_id: '8f5f0fcd-a640-4925-b17e-e72516a4c27b',
    is_guest: false
  },
  cardPayload: {
    expiry_month: '11',
    expiry_year: '2025',
    card_holder: 'Duna Developers',
    card_holder_dni: '22333444-4',
    card_number: '5416752602582580',
    card_cvv: '123',
    address1: 'Vergara 548',
    zip: '001100',
    city: 'santiago',
    state: 'rm',
    country: 'cl',
    phone: '12345755'
  },
  cards: {
    data: [
      {
        id: '927c3db8-a44e-49d6-8baf-2426798f0bab',
        user_id: '53f5c177-95d8-4236-95dd-391743acf008',
        card_holder: 'Visa',
        card_holder_dni: '1303753618',
        token: 'HDROvuVnNM3BrfSZ2G6MikBA0nJ',
        company: 'visa',
        last_four: '3704',
        expiration_date: '11/25',
        created_at: '2021-09-15T23:35:28.530253Z',
        updated_at: '2021-09-15T23:35:28.530267Z',
        deleted_at: null
      }
    ]
  },
  createCardResponse: {
    data: {
      id: 'feaeab5e-d66f-4eee-894b-4269ad4397ec',
      user_id: '9dd6b604-8db8-44e2-b07c-c57c5a44f08e',
      card_holder: 'Duna Developers',
      card_holder_dni: '22333444-4',
      token: '2JCsHClS9LNwwn0Pb5z2EEtzg4O',
      company: 'mastercard',
      last_four: '2580',
      expiration_date: '11/25',
      created_at: '2021-10-16T22:22:58.26533016Z',
      updated_at: '2021-10-16T22:22:58.26533528Z',
      deleted_at: null
    }
  },
  oneCard: {
    id: '927c3db8-a44e-49d6-8baf-2426798f0bab',
    data: {
      token: 'HDROvuVnNM3BrfSZ2G6MikBA0nJ',
      full_name: 'Visa',
      number: 'XXXX-XXXX-XXXX-3704',
      month: 11,
      year: 2025,
      last_four_digits: '3704',
      first_six_digits: '450995',
      card_type: 'visa',
      payment_method_type: 'credit_card',
      address1: 'Cra. 22 #137-38, Bogotá, Colombia',
      city: 'Bogotá',
      state: 'Bogotá',
      zip: '110121',
      country: 'CO',
      phone_number: '+57 320-3509848',
      storage_state: 'retained',
      erros: null,
      created_at: '2021-09-15T23:35:28Z',
      updated_at: '2021-09-15T23:38:06Z'
    }
  }
};

export default mockData;
