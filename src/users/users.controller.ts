import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { IdDto } from 'common/dto/id.dto';
import { RemoveDto } from 'common/dto/remove.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { ErrorResponseDto } from 'common/dto/error-reponse.dto';

/**
 * UsersController handles HTTP requests related to user management.
 * It defines endpoints for creating, retrieving, updating, and deleting users.
 */
@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Endpoint to create a new user.
   * @param createUserDto - Data Transfer Object containing user creation details.
   * @returns The created user entity.
   */
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: User
  })
  @ApiResponse({
    status: 422,
    description: 'Unprocessable Entity - User already exists',
    type: ErrorResponseDto
  })
  @ApiResponse({
    status: 503,
    description: 'Service Unavailable - Unable to create user',
    type: ErrorResponseDto
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Endpoint to retrieve all users.
   * @returns An array of user entities.
   */
  @Get()
  @ApiOperation({
    summary: 'Retrieves a list of all users registered in the application'
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of users'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: ErrorResponseDto
  })
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * Endpoint to retrieve a single user by ID.
   * @param id - The ID of the user.
   * @returns The found user entity.
   */
  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve a single user by ID'
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'The unique ID of the user to retrieve'
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the user',
    type: User
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: ErrorResponseDto
  })
  findOne(@Param('id') { id }: IdDto) {
    return this.usersService.findOneById(id);
  }

  /**
   * Endpoint to update an existing user by ID.
   * @param id - The ID of the user.
   * @param updateUserDto - Data Transfer Object containing updated user details.
   * @returns The updated user entity.
   */
  @Patch(':id')
  @ApiOperation({
    summary: 'Update a user by ID',
    description:
      'Updates the user details for the provided ID. Returns detailed error responses for various failure cases.'
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'The ID of the user to update. Must be a valid UUID.'
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: UpdateUserDto
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: ErrorResponseDto
  })
  @ApiResponse({
    status: 422,
    description:
      'Unprocessable Entity: User with this data already exists (e.g., duplicate email or username)',
    type: ErrorResponseDto
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorResponseDto
  })
  update(@Param('id') { id }: IdDto, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * Endpoint to delete (or soft-delete) a user by ID.
   * @param id - The ID of the user.
   * @param soft - Flag indicating whether to soft-delete the user.
   * @returns The result of the delete operation.
   */
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a user',
    description:
      'Deletes a user by ID. You can soft delete the user by marking it as deleted or permanently remove it from the database.'
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'The UUID of the user to delete.'
  })
  @ApiQuery({
    name: 'soft',
    type: Boolean,
    required: false,
    description:
      'Set to true for a soft delete. If omitted or false, a hard delete is performed.'
  })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully.',
    schema: {
      example: {
        message: 'User with ID {id} deleted successfully',
        softDeleted: true
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
    schema: {
      example: {
        statusCode: 404,
        message: 'User with ID {id} not found',
        error: 'Not Found',
        path: '/users/{id}'
      }
    }
  })
  @ApiResponse({
    status: 409,
    description: 'User cannot be deleted due to related data.',
    schema: {
      example: {
        statusCode: 409,
        message: 'User cannot be deleted due to related data',
        error: 'Conflict',
        path: '/users/{id}'
      }
    }
  })
  @ApiResponse({
    status: 500,
    description: 'An unexpected error occurred during deletion.',
    schema: {
      example: {
        statusCode: 500,
        message: 'An unexpected error occurred during deletion',
        error: 'Internal Server Error',
        path: '/users/{id}'
      }
    }
  })
  remove(@Param('id') { id }: IdDto, @Query() { soft }: RemoveDto) {
    return this.usersService.remove(id, soft);
  }
}
