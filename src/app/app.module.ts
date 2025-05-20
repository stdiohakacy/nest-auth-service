import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import configs from '../configs';
import { RequestModule } from './request/request.module';
import { AppMiddlewareModule } from './app.middleware.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      expandVariables: false,
    }),
    AppMiddlewareModule,
    CqrsModule.forRoot(),
    RequestModule.forRoot(),
  ],
  providers: [],
})
export class AppModule {}
