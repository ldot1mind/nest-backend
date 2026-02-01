import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const response = exception.getResponse();
    console.log('HttpStatus[status]', HttpStatus[status]);
    const message =
      typeof response === 'string'
        ? response
        : ((response as any).message ?? 'Error');

    res.status(status).json({
      statusCode: status,
      message,
      error: HttpStatus[status]
        .replace('_', ' ')
        .split(' ')
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(' '),
      timestamp: new Date().toISOString(),
      path: req.url
    });
  }
}
