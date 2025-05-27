import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { RequestContextService } from '../context/request.context.service';

@Injectable()
export class GrpcRequestIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const grpcCtx = context.switchToRpc().getContext();
    const metadata = grpcCtx?.getMap?.() ?? {};
    const requestId = metadata['x-request-id'] || uuid();

    RequestContextService.setRequestId(requestId);

    return next.handle();
  }
}
