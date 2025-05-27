import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export interface TypeOrmOptionInterface {
  createOptions(): TypeOrmModuleOptions;
}
