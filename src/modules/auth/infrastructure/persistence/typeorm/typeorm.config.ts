import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';

export const TypeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'postgres',
  database: 'nest-auth-db',
  entities: [join(__dirname, 'entities', '*.entity-orm.{ts,js}')],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
  migrationsTableName: 'migrations',
  synchronize: false,
  migrationsRun: true,
  logging: true,
};

export default new DataSource({ ...TypeOrmConfig, synchronize: false });
