import { Module } from '@nestjs/common';
import { TypeOrmDatabaseModule } from './persistence/typeorm/typeorm.module';

@Module({
  imports: [TypeOrmDatabaseModule],
  exports: [TypeOrmDatabaseModule],
})
export class InfrastructureModule {}
