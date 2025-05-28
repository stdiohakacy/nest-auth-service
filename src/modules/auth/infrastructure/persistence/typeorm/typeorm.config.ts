import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import dotenv from 'dotenv';
dotenv.config();

export const TypeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number.parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [join(__dirname, 'entities', '*.entity-orm.{ts,js}')],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
  migrationsTableName: 'migrations',
  logging: true,
};

export default new DataSource({ ...TypeOrmConfig });
