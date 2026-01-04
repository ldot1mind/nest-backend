import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus
} from '@nestjs/common';
import { DomainError } from 'core/exceptions/domain.error';
import { Request, Response } from 'express';
import { ErrorResponseDto } from 'infrastructure/http/dto/error-response.dto';

@Catch(DomainError)
export class BusinessExceptionFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let error = 'Internal Server Error';
    const message = exception.message;

    switch (exception.code) {
      case 'USER_NOT_FOUND':
        status = HttpStatus.NOT_FOUND;
        error = 'Not Found';
        break;
      case 'USER_ALREADY_EXISTS':
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        error = 'Unprocessable Entity';
        break;
      case 'USER_DELETION_CONFLICT':
        status = HttpStatus.CONFLICT;
        error = 'Conflict';
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        error = 'Internal Server Error';
    }

    res
      .status(status)
      .json(new ErrorResponseDto(status, message, error, req.url));
  }
}
