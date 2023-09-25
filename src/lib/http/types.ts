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

export type Pagination = {
  last_visible_page: number;
  has_next_page: boolean;
  items: { count: number; total: number; per_page: number };
};

export type HTTPClient<THandlers extends HTTPHandlers> = {
  readonly [HandlerName in keyof THandlers]: HandlerName extends keyof HTTPHandlers
    ? <
        TData,
        ResponseData = { data?: Maybe<TData>; pagination?: Maybe<Pagination> },
      >(
        ...args: Parameters<THandlers[HandlerName]>
      ) => Promise<ResponseData>
    : never;
};
