import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { ConfigService } from '@nestjs/config';
import { RequestAppInterface } from '@shared/request/interfaces/request.interface';
import { Response } from 'express';
import { AppExceptionInterface } from '../interfaces/app.interface';
import { MessageService } from '@shared/message/services/message.service';

@Catch(HttpException)
export class AppHttpFilter implements ExceptionFilter {
  private readonly logger = new Logger(AppHttpFilter.name);
  private readonly globalPrefix: string;
  private readonly docPrefix: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly messageService: MessageService,
  ) {
    this.globalPrefix = this.configService.get<string>('app.globalPrefix');
  }

  async catch(exception: HttpException, host: ArgumentsHost): Promise<void> {
    this.logger.error(exception);

    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const request: RequestAppInterface = ctx.getRequest<RequestAppInterface>();

    // set default values
    let statusHttp = HttpStatus.INTERNAL_SERVER_ERROR;
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let messagePath = `http.${statusHttp}`;
    const xLanguage = 'en';
    let data: Record<string, unknown>;

    const today = new Date();
    const xTimestamp = today.getTime();
    const xTimezone = today.getTimezoneOffset();

    let metadata = {
      language: xLanguage,
      timestamp: xTimestamp,
      timezone: xTimezone,
      path: request.path,
    };

    const responseException = exception.getResponse();

    statusHttp = exception.getStatus();
    messagePath = `http.${statusHttp}`;
    statusCode = exception.getStatus();

    if (this.isErrorException(responseException)) {
      const { _metadata } = responseException;
      statusCode = responseException.statusCode;
      messagePath = responseException.message;
      data = responseException.data;

      metadata = {
        ...metadata,
        ..._metadata,
      };
    }

    const message = this.messageService.setMessage(exception.message);

    const responseBody: AppExceptionInterface = {
      statusCode,
      message,
      _metadata: metadata,
      data,
    };

    response
      .setHeader('x-custom-lang', xLanguage)
      .setHeader('x-timestamp', xTimestamp)
      .setHeader('x-timezone', xTimezone)
      .status(statusHttp)
      .json(responseBody);

    return;
  }

  isErrorException(obj: any): obj is AppExceptionInterface {
    return typeof obj === 'object'
      ? 'statusCode' in obj && 'message' in obj
      : false;
  }
}
