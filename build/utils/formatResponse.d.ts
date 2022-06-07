import { ApiError, ResponseWithError } from '@duna/client';
export interface ResponseSdk<T> {
    data: T | null;
    error: ApiError | null;
}
export declare function formatReponse<T>(response: ResponseWithError<T>): Promise<ResponseSdk<T>>;
