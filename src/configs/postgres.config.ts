import { registerAs } from '@nestjs/config';

export default registerAs(
  'postgres',
  (): Record<string, any> => ({
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    name: process.env.POSTGRES_DB,
  }),
);
