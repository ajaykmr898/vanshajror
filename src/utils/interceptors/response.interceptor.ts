import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AllExceptionsFilter } from '../filters/exceptions.filter';

interface Response<T> {
  status: string;
  data: T;
  message: string;
}

@Injectable()
export class ResponseFormatInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  private readonly logger = new Logger(AllExceptionsFilter.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        status: 'success',
        data: data,
        message: 'ok',
      })),
      tap((res) => this.logger.log(res)),
    );
  }
}
