import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DefaultSuccessResponseDto } from '../dto/response.dto';

@Injectable()
export class ResponseFormatInterceptor<T>
  implements NestInterceptor<T, DefaultSuccessResponseDto<T>>
{
  private readonly logger = new Logger(ResponseFormatInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<DefaultSuccessResponseDto<T>> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) => ({
        status: 'success',
        statusCode: request.res.statusCode,
        message: 'ok',
        data: data,
      })),
      tap((res) => {
        this.logger.log(request.body);
        this.logger.log(res);
      }),
    );
  }
}
