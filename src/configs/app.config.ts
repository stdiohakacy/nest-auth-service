import { registerAs } from '@nestjs/config';

export default registerAs(
  'app',
  (): Record<string, unknown> => ({
    name: process.env.AUTH_SRV_APP_NAME,
    env: process.env.AUTH_SRV_APP_ENV,
    timezone: process.env.AUTH_SRV_APP_TIMEZONE,
    globalPrefix: '/api',

    grpc: {
      host: process.env.AUTH_SRV_GRPC_HOST,
      port: Number.parseInt(process.env.AUTH_SRV_GRPC_PORT),
      userService: {
        url: process.env.USER_SRV_GRPC_URL,
      },
    },
    rest: {
      host: process.env.AUTH_SRV_HTTP_HOST,
      port: Number.parseInt(process.env.AUTH_SRV_HTTP_PORT),
    },
    urlVersion: {
      enable: process.env.AUTH_SRV_URL_VERSIONING_ENABLE === 'true',
      prefix: 'v',
      version: process.env.AUTH_SRV_URL_VERSION,
    },
  }),
);
