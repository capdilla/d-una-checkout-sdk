export declare const urls: {
    APIGW_PROD_URL: string;
    APIGW_STAGING_URL: string;
};
export declare enum Endpoints {
    User = "/users",
    Addresses = "/addresses",
    Cards = "/cards",
    Merchants = "/merchants",
    Transactions = "/transactions",
    ExternalOrders = "/external-orders"
}
export declare const servicesEndpoints: {
    getShippingMethods: (orderToken: string) => string;
    getOrderTokenized: (orderToken: string) => string;
};
