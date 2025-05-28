import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import dotenv from 'dotenv';
dotenv.config();

export const TypeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.AUTH_SRV_POSTGRES_HOST,
  port: Number.parseInt(process.env.AUTH_SRV_POSTGRES_PORT),
  username: process.env.AUTH_SRV_POSTGRES_USER,
  password: process.env.AUTH_SRV_POSTGRES_PASSWORD,
  database: process.env.AUTH_SRV_POSTGRES_DB,
  entities: [join(__dirname, 'entities', '*.entity-orm.{ts,js}')],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
  migrationsTableName: 'migrations',
  logging: true,
};

export default new DataSource({ ...TypeOrmConfig });
