import { ApiError, isErrorResponse, ResponseWithError } from '@duna/client';

export interface ResponseSdk<T> {
  data: T | null;
  error: ApiError | null;
}

export async function formatReponse<T>(
  response: ResponseWithError<T>
): Promise<ResponseSdk<T>> {
  if (isErrorResponse(response)) {
    return {
      error: response,
      data: null
    };
  }

  return {
    error: null,
    data: response
  };
}
