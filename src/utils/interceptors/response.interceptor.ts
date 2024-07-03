import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

interface Response<T> {
  status: string;
  data: T;
  message: string;
  statusCode: number; // Include statusCode in the Response interface
}

@Injectable()
export class ResponseFormatInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  private readonly logger = new Logger(ResponseFormatInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) => ({
        status: 'success',
        statusCode: request.res.statusCode,
        message: 'ok',
        data: data,
      })),
      tap((res) => this.logger.log(res)),
    );
  }
}
