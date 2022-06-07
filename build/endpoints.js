"use strict";
exports.__esModule = true;
exports.servicesEndpoints = exports.Endpoints = exports.urls = void 0;
exports.urls = {
    APIGW_PROD_URL: 'https://apigw.getduna.com/',
    APIGW_STAGING_URL: 'https://staging-apigw.getduna.com/'
};
var Endpoints;
(function (Endpoints) {
    Endpoints["User"] = "/users";
    Endpoints["Addresses"] = "/addresses";
    Endpoints["Cards"] = "/cards";
    Endpoints["Merchants"] = "/merchants";
    Endpoints["Transactions"] = "/transactions";
    Endpoints["ExternalOrders"] = "/external-orders";
})(Endpoints = exports.Endpoints || (exports.Endpoints = {}));
exports.servicesEndpoints = {
    getShippingMethods: function (orderToken) {
        return "".concat(Endpoints.Merchants).concat(Endpoints.ExternalOrders, "/").concat(orderToken, "/shipping-methods");
    },
    getOrderTokenized: function (orderToken) {
        return "".concat(Endpoints.Merchants, "/orders/").concat(orderToken);
    }
};
