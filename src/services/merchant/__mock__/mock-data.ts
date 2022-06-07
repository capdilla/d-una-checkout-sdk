import { financialInstitutionsMock } from './financial-institutions-data';

const mockData = {
  merchant: {
    id: '81c347c6-be8c-4697-ac8a-486bdedae786',
    short_name: 'CHKEC',
    country: 'EC',
    currency: 'USD',
    logo_url: '',
    term_and_conditions_url: '',
    use_duna_send: false,
    latitude: -0.1613233,
    longitude: -78.4993293,
    ok: true,
    use_shipping_methods: true
  },
  merchantConfig: {
    id: 'b4c414f6-681a-40ef-84fb-d2ebfd3ef510',
    merchant_id: '00e44f8a-3863-48d7-9f79-9a151adfe044',
    configuration: {
      is_identity_document_hide: true
    },
    image_url: '/images/merchant/image.png',
    theme: {
      main_color: '#b5b522',
      secondary_color: '#2f5fdb',
      background_color: '#d4f2e6'
    },
    created_at: '2022-02-24 19:31:46.532343 +0000 UTC',
    updated_at: '2022-02-24 19:41:05.520294 +0000 UTC'
  },
  paymentMethods: {
    data: [
      {
        enabled: true,
        method_type: 'cash'
      },
      {
        enabled: true,
        method_type: 'credit_card'
      },
      {
        enabled: true,
        method_type: 'pos'
      },
      {
        enabled: true,
        method_type: 'debit_card',
        specific_fields: {
          financial_institutions: financialInstitutionsMock
        }
      }
    ]
  },
  order: {
    token: '48507f9f-c4fc-4e0f-8f15-67d0c7374c74',
    order: {
      order_id: '123-ASD-ASD',
      currency: 'USD',
      tax_amount: 10,
      store_code: 'K00K',
      shipping_amount: 10,
      items_total_amount: 754,
      sub_total: 1000,
      total_amount: 1000,
      items: [
        {
          id: '1123',
          name: 'Blue Hat',
          description: ' Large blue satin hat with initials embroidered.',
          options: 'string option',
          total_amount: {
            amount: 754,
            currency: 'USD',
            currency_symbol: '$'
          },
          unit_price: {
            amount: 754,
            currency: 'USD',
            currency_symbol: '$'
          },
          tax_amount: {
            amount: 754,
            currency: 'USD',
            currency_symbol: '$'
          },
          quantity: 3,
          uom: 'string',
          upc: 'string',
          sku: 'SKU-11021',
          isbn: '12-345-678-90123',
          brand: 'Bolt Swagstore',
          manufacturer: 'Bolt Factory',
          category: 'hats',
          color: 'Red',
          size: 'XXL',
          weight: {
            weight: 22,
            unit: 'kg'
          },
          image_url: 'https://boltswagstore.com/inventory/hats/red-hat.png',
          details_url: 'https://boltswagstore.com/inventory/hats/red-hat.png',
          type: 'physical',
          taxable: true
        }
      ],
      discounts: [],
      shipping_address: {
        id: 1093,
        user_id: '53f5c177-95d8-4236-95dd-391743acf008',
        first_name: 'Carlos',
        last_name: 'Padilla',
        phone: '+593 66-666-666',
        identity_document: '1150218418',
        lat: -0.1637022,
        lng: -78.499344,
        address1: 'El Bosque, Quito, Ecuador',
        address2: 'casa',
        city: 'Quito',
        zipcode: '',
        state_name: 'Pichincha',
        country: 'EC',
        additional_description: 'casa',
        address_type: '',
        is_default: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date(),
        is_default_address: false,
        is_last_address: false,
        is_billing_address: false
      },
      user_instructions: 'This item is a gift.',
      metadata: {
        key1: 'value1',
        key2: 'value2'
      },
      status: 'active'
    }
  }
};

export default mockData;
