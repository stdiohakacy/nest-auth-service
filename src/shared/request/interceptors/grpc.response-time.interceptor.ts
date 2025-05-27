import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { performance } from 'perf_hooks';
import { RequestContextService } from '../context/request.context.service';

@Injectable()
export class GrpcResponseTimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const start = performance.now();

    return next.handle().pipe(
      tap(() => {
        const duration = performance.now() - start;
        const method = context.getHandler().name;
        const service = context.getClass().name;

        // Optional: store in metrics system (Prometheus, Datadog, etc.)
        RequestContextService.clear();
      }),
    );
  }
}
