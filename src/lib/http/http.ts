import { SERVER_URL } from '@/constants';
import { RateLimit } from 'async-sema';
import type { BasicHandler, HTTPClient, HTTPHandlers } from '.';

const createHTTPClient = (
  baseURL: string,
  handlers: HTTPHandlers,
): HTTPClient<HTTPHandlers> => {
  const rateLimit = RateLimit(2);

  const handlerEntries = Object.entries(handlers).map(
    ([methodName, method]) => [
      methodName,
      async (...args: Parameters<BasicHandler>) => {
        try {
          await rateLimit();
          const { url, init } = method(...args);
          const response = await fetch(`${baseURL}${url}`, init);

          if (!response.ok) {
            throw new Error(
              `Failed to fetch: ${response.status} - ${response.statusText}`,
            );
          }

          const { data } = await response.json();
          return data;
        } catch (error) {
          if (process.env.NODE_ENV !== 'test') {
            console.error(error);
          }
          throw error;
        }
      },
    ],
  );

  return Object.fromEntries(handlerEntries);
};

export const http = createHTTPClient(SERVER_URL, {
  get: (url, init = {}) => {
    return { url, init: { ...init, method: 'GET' } };
  },

  post: (url, data, init = {}) => {
    return {
      url,
      init: { ...init, method: 'POST', body: JSON.stringify(data) },
    };
  },
});
