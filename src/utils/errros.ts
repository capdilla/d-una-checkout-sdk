export enum ErrorsCode {
  EmailNotSet = 'Email has not been set',
  UserNotSet = 'User has not been set',
  ShippingAddressNotSet = "Shipping address can't be null",
  BillingAddressNotSet = "Billing address can't be null",
  PaymentMethodNotSet = "Payment Method can't be null",
  OrderNotFound = 'Order not found',
  CantAuthMerchant = "Can't found merchant, api-key is invalid",
  StoreCodeNotFoundPaymentMethods = 'Order need store code to get payment methods',
  EmnptyStoreCode = 'Store Code is empty, check that you have selected a shipping rate'
}
