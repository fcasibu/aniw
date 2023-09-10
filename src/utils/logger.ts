import pino, { stdSerializers, stdTimeFunctions } from 'pino';

const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = pino({
  formatters: {
    level: (label) => ({ label }),
  },
  level: isDevelopment ? 'debug' : 'info',
  serializers: {
    error: stdSerializers.err,
  },
  timestamp: stdTimeFunctions.isoTime,
});
