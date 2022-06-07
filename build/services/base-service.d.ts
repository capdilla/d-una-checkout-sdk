import Context from '../checkout/context';
export interface ServiceConfig {
    endpoint: string;
    apiKey: string;
    authToken?: string;
    context: Context;
}
declare class BaseService {
    protected config: ServiceConfig;
    constructor(cfg: ServiceConfig);
    protected getClient(): import("@duna/client").ClientAPI;
    protected getAuthUser(): import("./auth").User | undefined;
    protected isUserSet(): import("@duna/client").ApiError | null;
}
export default BaseService;
