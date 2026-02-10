import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginResponseDto } from './dto/login-response.dto';

/** Register User Swagger */
export const ApiRegisterUser = () =>
  applyDecorators(
    ApiOperation({ summary: 'Register a new user' }),
    ApiResponse({
      status: 201,
      description: 'User successfully registered',
      type: RegisterUserDto
    }),
    ApiBadRequestResponse({ description: 'Invalid input data' }),
    ApiInternalServerErrorResponse({ description: 'Unexpected error occurred' })
  );

/** Login User Swagger */
export const ApiLoginUser = () =>
  applyDecorators(
    ApiOperation({ summary: 'User login' }),
    ApiResponse({
      status: 200,
      description: 'Successfully logged in',
      type: LoginResponseDto
    }),
    ApiBadRequestResponse({ description: 'Invalid credentials' }),
    ApiInternalServerErrorResponse({ description: 'Unexpected error occurred' })
  );

/** Change Password Swagger */
export const ApiChangePassword = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Change user password',
      description:
        'This endpoint allows the user to change their password. The current password must be provided for validation.'
    }),
    ApiResponse({
      status: 204,
      description: 'Password changed successfully'
    }),
    ApiBadRequestResponse({
      description:
        'Invalid input data, including an incorrect current password or other validation errors'
    }),
    ApiUnauthorizedResponse({
      description:
        'Unauthorized: User must be authenticated to change the password'
    }),
    ApiInternalServerErrorResponse({ description: 'Internal server error' })
  );
