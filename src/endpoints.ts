export const urls = {
  APIGW_PROD_URL: 'https://apigw.getduna.com/',
  APIGW_STAGING_URL: 'https://staging-apigw.getduna.com/'
};

export enum Endpoints {
  User = '/users',
  Addresses = '/addresses',
  Cards = '/cards',
  Merchants = '/merchants',
  Transactions = '/transactions',
  ExternalOrders = '/external-orders'
}

export const servicesEndpoints = {
  getShippingMethods: (orderToken: string) =>
    `${Endpoints.Merchants}${Endpoints.ExternalOrders}/${orderToken}/shipping-methods`,
  getOrderTokenized: (orderToken: string) =>
    `${Endpoints.Merchants}/orders/${orderToken}`
};
