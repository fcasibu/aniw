import { SERVER_URL } from './constants';

const cspConfig = {
  'default-src': ['none'],
  'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
  'connect-src': ["'self'", SERVER_URL],
  'img-src': ["'self'"],
  'style-src': ["'self'", "'unsafe-inline'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'worker-src': ['blob:'],
  'font-src': ["'self'", 'data:'],
  'frame-ancestors': ["'self'"],
  'upgrade-insecure-requests': [],
} as const;

export const csp = Object.entries(cspConfig)
  .map(([key, value]) => `${key} ${value.join(' ')};`)
  .join(' ')
  .replace(/\s+/g, ' ')
  .trim();
