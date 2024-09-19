import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CustomRequest } from 'common/interfaces/custom-request.interface';

export const User = createParamDecorator(
  (data: 'user' | 'session', ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<CustomRequest>();
    return data ? request.user?.[data] : request.user;
  }
);
