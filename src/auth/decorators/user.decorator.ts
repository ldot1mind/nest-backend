import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CustomRequest } from 'common/interfaces/custom-request.interface';

/**
 * Custom decorator to extract user information from the request.
 *
 * This decorator allows easy access to the authenticated user or
 * specific user-related data (such as session information) from the
 * request object. It retrieves the user data set in the request
 * during authentication.
 *
 * Usage:
 * - `@User()` retrieves the entire user object.
 * - `@User('user')` or `@User('session')` retrieves specific properties
 *   from the user object, as indicated by the provided string.
 */
export const User = createParamDecorator(
  (data: 'user' | 'session', ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<CustomRequest>();
    return data ? request.user?.[data] : request.user;
  }
);
