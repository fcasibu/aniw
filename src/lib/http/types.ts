import type { Maybe } from '@/types';

export type RequestURL = string | Request | URL;
export type RequestOptions = Omit<RequestInit, 'method'>;
export type FetchRequest = { url: RequestURL; init?: RequestOptions };

export type BasicHandler = (
  url: RequestURL,
  init?: RequestOptions,
) => FetchRequest;
export type HandlerWithData = (
  url: RequestURL,
  data: unknown,
  init?: RequestOptions,
) => FetchRequest;

export type HTTPHandlers = {
  readonly get: BasicHandler;
  readonly post: HandlerWithData;
};

export type HTTPClient<THandlers extends HTTPHandlers> = {
  readonly [HandlerName in keyof THandlers]: HandlerName extends keyof HTTPHandlers
    ? <TData>(
        ...args: Parameters<THandlers[HandlerName]>
      ) => Promise<Maybe<TData>>
    : never;
};
