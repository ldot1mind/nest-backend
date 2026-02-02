import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorResponseDto } from 'infrastructure/http/dto/error-response.dto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const response = exception.getResponse();
    const isDev = process.env.NODE_ENV !== 'production';

    // set error
    const error = HttpStatus[status]
      .replace('_', ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    let details: string | undefined;

    if (isDev && exception instanceof Error) {
      const stackLine = exception.stack
        ?.split('\n')
        .find((line) => line.includes('.ts') || line.includes('.js'));

      details = stackLine?.trim();
    }

    const message =
      typeof response === 'string'
        ? response
        : ((response as any).message ?? 'Error');

    const payload: ErrorResponseDto = {
      statusCode: status,
      message,
      error,
      path: req.url,
      timestamp: new Date().toISOString(),
      ...(isDev && details ? { details } : {})
    };

    res.status(status).json(payload);
  }
}
