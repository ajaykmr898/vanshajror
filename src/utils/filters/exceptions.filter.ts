import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const err = exception.getResponse();
    const message =
      typeof err === 'string'
        ? err
        : (err as { message: string })?.message || 'An error occurred';
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      status: 'error',
      code: status,
      message: message,
      //path: request.url,
      //message: 'An error occurred',
    });
  }
}
