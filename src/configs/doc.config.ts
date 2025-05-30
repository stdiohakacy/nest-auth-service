import { registerAs } from '@nestjs/config';

export default registerAs(
  'doc',
  (): Record<string, unknown> => ({
    name: `${process.env.AUTH_SRV_APP_ENV} APIs Specification`,
    description: 'Section for describe whole APIs',
    prefix: '/docs',
  }),
);
