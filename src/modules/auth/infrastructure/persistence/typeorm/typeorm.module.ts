import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmOptionModule } from './typeorm.option.module';
import { TypeOrmOptionService } from './typeorm.option.service';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [TypeOrmOptionModule],
      inject: [TypeOrmOptionService],
      useFactory: (typeormOptionService: TypeOrmOptionService) =>
        typeormOptionService.createOptions(),
    }),
  ],
})
export class TypeOrmDatabaseModule {}
