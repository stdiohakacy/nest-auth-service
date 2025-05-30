import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { MessageService } from '@shared/message/services/message.service';
import { RequestValidationException } from '@shared/request/exceptions/request.validation.exception';
import { RequestAppInterface } from '@shared/request/interfaces/request.interface';
import { Response } from 'express';

@Catch(RequestValidationException)
export class AppValidationFilter implements ExceptionFilter {
  private readonly logger = new Logger(AppValidationFilter.name);

  constructor(private readonly messageService: MessageService) {}

  async catch(
    exception: RequestValidationException,
    host: ArgumentsHost,
  ): Promise<void> {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const request = ctx.getRequest<RequestAppInterface>();

    this.logger.error(exception);

    // metadata
    const today = new Date();
    const xTimestamp = today.getTime();
    const xTimezone = today.getTimezoneOffset();

    const metadata: any = {
      timestamp: xTimestamp,
      timezone: xTimezone,
      path: request.path,
    };

    const message = this.messageService.setMessage(exception.message);

    const errors = exception.errors;

    const responseBody = {
      statusCode: exception.statusCode,
      message,
      errors,
      _metadata: metadata,
    };

    response
      .setHeader('x-timestamp', xTimestamp)
      .setHeader('x-timezone', xTimezone)
      .status(exception.httpStatus)
      .json(responseBody);
    return;
  }
}
