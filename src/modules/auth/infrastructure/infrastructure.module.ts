import { Module } from '@nestjs/common';
import { TypeOrmDatabaseModule } from './persistence/typeorm/typeorm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUserEntityOrm } from './persistence/typeorm/entities/auth-user.entity-orm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE_GRPC',
        transport: Transport.GRPC,
        options: {
          url: '[::]:6000',
          package: 'user',
          protoPath: join(__dirname, '../presentation/grpc/protos/user.proto'),
        },
      },
    ]),
    TypeOrmDatabaseModule,
    TypeOrmModule.forFeature([AuthUserEntityOrm]),
  ],
  exports: [TypeOrmDatabaseModule, TypeOrmModule, ClientsModule],
})
export class InfrastructureModule {}
