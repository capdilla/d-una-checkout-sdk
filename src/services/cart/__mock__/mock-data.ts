const mockData = {
  discounts: {
    code: 'CHECKOUTST',
    reference: 'CHECKOUTST',
    description: 'CUPON DE PRUEBA DE CHECKOUT ST',
    free_shipping: {}
  },
  paymentMethod: {
    enabled: true,
    method_type: 'cash',
    processor_name: 'cash'
  },
  order: {
    token: 'c419a758-1d42-43cb-95cd-061e79a565ce',
    order: {
      order_id: '184a3ae7-99b5-4928-8408-d38e228d3e8b',
      store_code: '50',
      currency: 'USD',
      tax_amount: 10,
      shipping_amount: 2,
      items_total_amount: 299,
      sub_total: 299,
      total_amount: 307,
      items: [
        {
          id: '79',
          name: '10 ALITAS VOLANTE',
          description: '10 alitas picantes',
          options: 'string option',
          total_amount: { amount: 299, currency: 'USD', currency_symbol: '$' },
          unit_price: { amount: 299, currency: 'USD', currency_symbol: '$' },
          tax_amount: { amount: 754, currency: 'USD', currency_symbol: '$' },
          quantity: 1,
          uom: 'string',
          upc: 'string',
          sku: 'SKU-11021',
          isbn: '12-345-678-90123',
          brand: 'Bolt Swagstore',
          manufacturer: 'Bolt Factory',
          category: 'hats',
          color: 'Red',
          size: 'XXL',
          weight: { weight: 22, unit: 'kg' },
          image_url: 'https://boltswagstore.com/inventory/hats/red-hat.png',
          details_url: 'https://boltswagstore.com/inventory/hats/red-hat.png',
          type: 'physical',
          taxable: true
        }
      ],
      discounts: [
        {
          amount: 754,
          code: 'SUMMERFUN15',
          reference: 'SUMMERFUN15',
          description: 'Take 15% off of your order.',
          details_url: 'https://boltswagstore.com/discounts/#12345',
          free_shipping: { is_free_shipping: false, maximum_cost_allowed: 100 },
          discount_category: 'coupon'
        }
      ],
      shipping_address: {
        id: 1868,
        user_id: 'ebd6105c-b2ae-11eb-8529-0242ac130003',
        first_name: 'NELSON',
        last_name: 'JIMENEZ',
        phone: '593986100449',
        identity_document: '1150218418',
        lat: -0.100032,
        lng: -78.46956,
        address1: 'Av. Eloy Alfaro 14, Quito 170515, Ecuador',
        address2: 'Av. Eloy Alfaro 14, Quito 170515, Ecuador',
        city: 'Quito',
        zipcode: '170515',
        state_name: '',
        country_code: '',
        additional_description: 'Descripción adicional',
        address_type: 'home',
        is_default: false,
        created_at: '2021-11-03T22:09:09.086990957Z',
        updated_at: '2021-11-03T22:09:09.087014623Z'
      },
      shipping_options: {
        type: 'dine_in',
        details: {
          store_name: 'Store name',
          address: '6 Rotermanni 11343 Talinn',
          address_coordinates: { lat: 4.721245, lng: -74.04673 },
          contact: { name: 'jhon snow', phone: '972514910' },
          additional_details: { stock_location: '', table_number: '3' }
        }
      },
      user_instructions: 'This item is a gift.',
      metadata: { key1: 'value1', key2: 'value2' },
      status: 'pending',
      payment: null
    }
  },
  address: {
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
    state_code: 'Pichincha',
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
  cardTokenized: {
    id: '927c3db8-a44e-49d6-8baf-2426798f0bab',
    user_id: '53f5c177-95d8-4236-95dd-391743acf008',
    card_holder: 'Visa',
    card_holder_dni: '1303753618',
    token: 'HDROvuVnNM3BrfSZ2G6MikBA0nJ',
    first_six: '411111',
    company: 'visa',
    last_four: '3704',
    expiration_date: '11/25',
    created_at: '2021-09-15T23:35:28.530253Z',
    updated_at: '2021-09-15T23:35:28.530267Z',
    deleted_at: '2021-09-15T23:35:28.530267Z'
  },
  orderProceess: {
    order: {
      order_id: 'AS22D22-2ASD-12322-123-123',
      currency: 'USD',
      tax_amount: 10,
      shipping_amount: 10,
      items_total_amount: 754,
      sub_total: 123,
      total_amount: 2000,
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
      discounts: [
        {
          amount: 754,
          code: 'SUMMERFUN15',
          reference: 'SUMMERFUN15',
          description: 'Take 15% off of your order.',
          details_url: 'https://boltswagstore.com/discounts/#12345',
          free_shipping: {
            maximum_cost_allowed: 100
          },
          discount_category: 'coupon'
        }
      ],
      shipping_address: {
        id: 1868,
        user_id: 'ebd6105c-b2ae-11eb-8529-0242ac130003',
        first_name: 'NELSON',
        last_name: 'JIMENEZ',
        phone: '573015245211',
        identity_document: '32423432',
        lat: 4.721245,
        lng: -74.04673,
        address1: 'AK 19 - Cl 137',
        address2: 'AK 19 - Cl 137',
        city: 'BOGOTÁ',
        zipcode: '110121',
        additional_description: 'Descripción adicional',
        address_type: 'home',
        created_at: '2021-11-03T22:09:09.086990957Z',
        updated_at: '2021-11-03T22:09:09.087014623Z'
      },
      user_instructions: 'This item is a gift.',
      metadata: {
        key1: 'value1',
        key2: 'value2'
      },
      status: 'succeeded',
      payment: {
        transaction: {
          amount: 2000,
          authorization_code: '000000',
          card_brand: 'visa',
          card_number: '1111',
          created_at: '2021-11-04T19:00:58.656186928Z',
          external_transaction_id: '326280649098370945',
          id: '15ae9479-2791-4c53-bd56-8548ec5cafc9',
          merchant_id: 'b5db0dc4-3f19-486a-a0dd-e5061f60a70e',
          result: 'Succeeded!',
          result_code: 'messages.transaction_succeeded',
          status: 'processed',
          transaction_id: 'AS22D22-2ASD-12322-123-123',
          updated_at: '2021-11-04T19:00:58.657951779Z',
          user_id: 'ebd6105c-b2ae-11eb-8529-0242ac130003'
        }
      }
    }
  },
  shipping_rate: {
    service_name: 'Recargo a domicilio 69',
    description: 'Recargo a domicilio 69',
    cost: 1990,
    tax_amount: 0,
    reference: '',
    estimated_delivery_date: '',
    tax_code: ''
  },
  shipping_methods: [
    {
      code: 'international-1',
      name: 'Envío internacional tradicional',
      min_delivery_date: '2022-01-26T23:59:36+00:00',
      max_delivery_date: '2022-01-30T23:59:36+00:00',
      cost: 1000,
      display_cost: 'USD 10.00',
      tax_amount: 0,
      display_tax_amount: 'USD 0.00'
    }
  ],
  installments: [
    {
      installments: 1,
      installments_amount: 2190,
      display_installments_amount: 'USD 21.90',
      installment_rate: 0,
      display_installment_rate: 'USD 0.00',
      discount_rate: 0,
      installment_rate_collector: ['MERCADOPAGO']
    },
    {
      installments: 3,
      installments_amount: 730,
      display_installments_amount: 'USD 7.30',
      installment_rate: 0,
      display_installment_rate: 'USD 0.00',
      discount_rate: 0,
      installment_rate_collector: ['THIRD_PARTY']
    },
    {
      installments: 6,
      installments_amount: 365,
      display_installments_amount: 'USD 3.65',
      installment_rate: 0,
      display_installment_rate: 'USD 0.00',
      discount_rate: 0,
      installment_rate_collector: ['THIRD_PARTY']
    },
    {
      installments: 9,
      installments_amount: 243,
      display_installments_amount: 'USD 2.43',
      installment_rate: 0,
      display_installment_rate: 'USD 0.00',
      discount_rate: 0,
      installment_rate_collector: ['THIRD_PARTY']
    },
    {
      installments: 12,
      installments_amount: 182,
      display_installments_amount: 'USD 1.82',
      installment_rate: 0,
      display_installment_rate: 'USD 0.00',
      discount_rate: 0,
      installment_rate_collector: ['THIRD_PARTY']
    }
  ]
};

export default mockData;
