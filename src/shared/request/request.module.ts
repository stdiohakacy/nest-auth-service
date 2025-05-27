import { DynamicModule, Global, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { GrpcRequestIdInterceptor } from './interceptors/grpc.request.id.interceptor';
import { GrpcResponseTimeInterceptor } from './interceptors/grpc.response-time.interceptor';

const interceptors = [GrpcRequestIdInterceptor, GrpcResponseTimeInterceptor];

@Global()
@Module({})
export class RequestModule {
  static forRoot(): DynamicModule {
    return {
      module: RequestModule,
      controllers: [],
      providers: [
        ...interceptors,
        {
          provide: APP_PIPE,
          useFactory: () =>
            new ValidationPipe({
              transform: true,
              skipUndefinedProperties: true,
              forbidUnknownValues: true,
            }),
        },
      ],
      exports: [...interceptors],
    };
  }
}
