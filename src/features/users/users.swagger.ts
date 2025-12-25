import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ErrorResponseDto } from 'infrastructure/http/dto/error-response.dto';
import { User } from './entities/user.entity';

/** Create User Swagger */
export const ApiCreateUser = () =>
  applyDecorators(
    ApiOperation({ summary: 'Create a new user' }),
    ApiResponse({
      status: 201,
      description: 'User successfully created',
      type: User
    }),
    ApiResponse({
      status: 422,
      description: 'Unprocessable Entity',
      type: ErrorResponseDto
    }),
    ApiResponse({
      status: 503,
      description: 'Service Unavailable',
      type: ErrorResponseDto
    })
  );

/** Get All Users Swagger */
export const ApiGetAllUsers = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get all users' }),
    ApiResponse({
      status: 200,
      description: 'Successfully retrieved users',
      type: [User]
    }),
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
      type: ErrorResponseDto
    })
  );

/** Get Single User Swagger */
export const ApiGetUser = () =>
  applyDecorators(
    ApiOperation({ summary: 'Retrieve a single user by ID' }),
    ApiParam({
      name: 'id',
      type: String,
      required: true,
      description: 'User ID'
    }),
    ApiResponse({ status: 200, description: 'User found', type: User }),
    ApiResponse({
      status: 404,
      description: 'User not found',
      type: ErrorResponseDto
    })
  );

/** Update User Swagger */
export const ApiUpdateUser = () =>
  applyDecorators(
    ApiOperation({ summary: 'Update a user by ID' }),
    ApiParam({
      name: 'id',
      type: String,
      required: true,
      description: 'User ID'
    }),
    ApiResponse({
      status: 200,
      description: 'User updated successfully',
      type: User
    }),
    ApiResponse({
      status: 404,
      description: 'User not found',
      type: ErrorResponseDto
    }),
    ApiResponse({
      status: 422,
      description: 'Duplicate data conflict',
      type: ErrorResponseDto
    }),
    ApiResponse({
      status: 500,
      description: 'Internal server error',
      type: ErrorResponseDto
    })
  );

/** Delete User Swagger */
export const ApiDeleteUser = () =>
  applyDecorators(
    ApiOperation({ summary: 'Delete a user' }),
    ApiParam({
      name: 'id',
      type: String,
      required: true,
      description: 'User ID'
    }),
    ApiQuery({
      name: 'soft',
      type: Boolean,
      required: false,
      description: 'Soft delete if true'
    }),
    ApiResponse({
      status: 200,
      description: 'User deleted successfully',
      schema: {
        example: { message: 'User deleted successfully', softDeleted: true }
      }
    }),
    ApiResponse({
      status: 404,
      description: 'User not found',
      schema: {
        example: {
          statusCode: 404,
          message: 'User not found',
          error: 'Not Found'
        }
      }
    }),
    ApiResponse({
      status: 409,
      description: 'User cannot be deleted due to related data',
      schema: {
        example: {
          statusCode: 409,
          message: 'User cannot be deleted due to related data',
          error: 'Conflict'
        }
      }
    }),
    ApiResponse({
      status: 500,
      description: 'Internal server error',
      schema: {
        example: {
          statusCode: 500,
          message: 'Internal server error',
          error: 'Internal Server Error'
        }
      }
    })
  );
