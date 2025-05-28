import { Module } from '@nestjs/common';
import { TypeOrmDatabaseModule } from './persistence/typeorm/typeorm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUserEntityOrm } from './persistence/typeorm/entities/auth-user.entity-orm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'USER_SERVICE_GRPC',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('app.grpc.userService.url'),
            package: 'user',
            protoPath: join(
              __dirname,
              '../presentation/grpc/protos/user.proto',
            ),
          },
        }),
      },
    ]),
    TypeOrmDatabaseModule,
    TypeOrmModule.forFeature([AuthUserEntityOrm]),
  ],
  exports: [TypeOrmDatabaseModule, TypeOrmModule, ClientsModule],
})
export class InfrastructureModule {}
