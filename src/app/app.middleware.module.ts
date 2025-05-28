import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppRequestIdMiddleware } from './middlewares/app.request-id.middleware';
import { AppHelmetMiddleware } from './middlewares/app.helmet.middleware';
import {
  AppJsonBodyParserMiddleware,
  AppRawBodyParserMiddleware,
  AppTextBodyParserMiddleware,
  AppUrlencodedBodyParserMiddleware,
} from './middlewares/app.body-parser.middleware';
import { AppCorsMiddleware } from './middlewares/app.cors.middleware';
import { AppResponseTimeMiddleware } from './middlewares/app.response-time.middleware';
import { APP_FILTER } from '@nestjs/core';
import { AppValidationFilter } from 'src/app/filters/app.validation.filter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppValidationFilter,
    },
  ],
})
export class AppMiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(
        AppRequestIdMiddleware,
        AppHelmetMiddleware,
        AppJsonBodyParserMiddleware,
        AppTextBodyParserMiddleware,
        AppRawBodyParserMiddleware,
        AppUrlencodedBodyParserMiddleware,
        AppCorsMiddleware,
        AppResponseTimeMiddleware,
      )
      .forRoutes('*wildcard');
  }
}
