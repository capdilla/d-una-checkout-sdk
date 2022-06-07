import { CheckoutConfig, Services } from './interfaces';
import { OrderResponse } from '..';
import { StateJson } from './state';
export default class Checkout {
    private static services;
    private static context;
    private static initServices;
    private static buildMethods;
    static getInstance(): Services;
    static getInstanceJSON(): {
        client: any;
        user?: import("..").User | undefined;
        merchant?: import("..").Merchant | undefined;
        order: OrderResponse;
    };
    static setInstanceJson(instanceJson: StateJson): void;
    static setInstance(services: Services): void;
    private static auth;
    static init({ apiKey, env, deviceId, sessionId, authToken }: CheckoutConfig): Promise<Services>;
}
