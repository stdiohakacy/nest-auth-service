import { registerAs } from '@nestjs/config';

export default registerAs(
  'app',
  (): Record<string, unknown> => ({
    name: process.env.APP_NAME,
    env: process.env.APP_ENV,
    timezone: process.env.APP_TIMEZONE,
    globalPrefix: '/api',

    grpc: {
      host: process.env.GRPC_HOST,
      port: Number.parseInt(process.env.GRPC_PORT),
    },
    rest: {
      host: process.env.HTTP_HOST,
      port: Number.parseInt(process.env.HTTP_PORT),
    },
    urlVersion: {
      enable: process.env.URL_VERSIONING_ENABLE === 'true',
      prefix: 'v',
      version: process.env.URL_VERSION,
    },
  }),
);
