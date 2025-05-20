import { APP_FILTER } from '@nestjs/core';
import { Http2gRPCExceptionFilter } from './filters/http2grpc.exception.filter';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: Http2gRPCExceptionFilter,
    },
  ],
})
export class AppMiddlewareModule {}
