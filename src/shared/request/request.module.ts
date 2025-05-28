import {
  DynamicModule,
  Global,
  HttpStatus,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { GrpcRequestIdInterceptor } from './interceptors/grpc.request.id.interceptor';
import { GrpcResponseTimeInterceptor } from './interceptors/grpc.response-time.interceptor';
import { ValidationError } from 'class-validator';
import { RequestValidationException } from './exceptions/request.validation.exception';

const interceptors = [GrpcRequestIdInterceptor, GrpcResponseTimeInterceptor];

@Global()
@Module({})
export class RequestModule {
  static forRoot(): DynamicModule {
    return {
      module: RequestModule,
      providers: [
        ...interceptors,
        {
          provide: APP_PIPE,
          useFactory: () =>
            new ValidationPipe({
              transform: true,
              skipUndefinedProperties: true,
              forbidUnknownValues: true,
              errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
              exceptionFactory: async (errors: ValidationError[]) =>
                new RequestValidationException(errors),
            }),
        },
      ],
      exports: [...interceptors],
    };
  }
}
