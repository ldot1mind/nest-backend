import {
  BadRequestException,
  Injectable,
  NestMiddleware
} from '@nestjs/common';
import { LoginUserDto } from 'auth/dto/login-user.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

/**
 * The `LoginValidationMiddleware` class is a NestJS middleware that validates incoming login requests.
 * It uses class-transformer to convert the request body into a `LoginUserDto` instance and validates it
 * using class-validator. If validation fails, it throws a `BadRequestException` with the validation errors.
 *
 * @implements NestMiddleware
 */
@Injectable()
export class LoginValidationMiddleware implements NestMiddleware {
  /**
   * The middleware function that processes incoming requests.
   *
   * @param req - The incoming request object.
   * @param res - The response object.
   * @param next - The next middleware function in the stack.
   */
  async use(req: Request, res: Response, next: NextFunction) {
    // Transform the request body into an instance of LoginUserDto
    const loginDto = plainToInstance(LoginUserDto, req.body);

    // Validate the transformed DTO and check for errors
    const errors = await validate(loginDto, {
      // Removes properties that are not in the DTO
      whitelist: true,

      // Throws an error if non-whitelisted properties are present
      forbidNonWhitelisted: true
    });

    // If there are validation errors, throw a BadRequestException
    if (errors.length)
      // Return validation errors in the response
      throw new BadRequestException(errors);

    // Proceed to the next middleware or route handler
    next();
  }
}
