import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmOptionService } from './typeorm.option.service';

@Module({
  imports: [ConfigModule],
  providers: [TypeOrmOptionService],
  exports: [TypeOrmOptionService],
})
export class TypeOrmOptionModule {}
