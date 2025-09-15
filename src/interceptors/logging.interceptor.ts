import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

export class LoggingInteceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const now = Date.now();

    console.log('Before');

    return next.handle().pipe(
      tap(() => {
        const request: Request = context.switchToHttp().getRequest();
        const response: Response = context.switchToHttp().getResponse();
        const after = Date.now();
        const log = {
          method: request.method,
          url: request.url,
          header: request.headers,
          statusCode: response.statusCode,
          body: request.body,
          executionTIme: `${after - now}ms`,
        };
        console.log(log);
      }),
    );
  }
}
