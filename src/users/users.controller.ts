import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
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
import { RolesGuard } from 'auth/guards/roles.gurad';
import { UserRole } from 'common/enums/user-role.enum';
import { Roles } from 'auth/decorators/roles.decorator';

/**
 * The `UsersController` is responsible for handling all incoming HTTP requests related to managing user entities.
 * This includes creating, retrieving, updating, and deleting users. The controller is protected by the `RolesGuard`
 * and is only accessible to users with the `ADMIN` role.
 */
@Controller('users')
@UseGuards(RolesGuard)
@Roles(UserRole.ADMIN)
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Handles the creation of a new user.
   *
   * **Decorators:**
   * - `@Post()`: Marks this as a POST request to create a new user.
   * - `@Body()`: Binds the incoming request body to the `CreateUserDto`.
   *
   * @param createUserDto - The DTO containing the new user's details.
   * @returns The newly created user entity.
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
   * Fetches all users.
   *
   * **Decorators:**
   * - `@Get()`: Marks this as a GET request to retrieve all users.
   *
   * @returns An array of all user entities in the system.
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
   * Fetches a single user based on the provided ID.
   *
   * **Decorators:**
   * - `@Get(':id')`: Marks this as a GET request to retrieve a user by their ID.
   * - `@Param()`: Extracts the ID parameter from the request URL.
   *
   * @param id - The unique identifier of the user to be retrieved.
   * @returns The found user entity, or an error if not found.
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
   * Updates an existing user by ID.
   *
   * **Decorators:**
   * - `@Patch(':id')`: Marks this as a PATCH request to update the user by their ID.
   * - `@Param()`: Extracts the user ID from the request URL.
   * - `@Body()`: Binds the incoming request body to the `UpdateUserDto`.
   *
   * @param id - The ID of the user to be updated.
   * @param updateUserDto - The DTO containing the updated user details.
   * @returns The updated user entity or appropriate error messages.
   */
  @Patch(':id')
  @ApiOperation({
    summary: 'Update a user by ID',
    description: 'Updates the user details for the provided ID.'
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
    description: 'Unprocessable Entity - Duplicate data conflict',
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
   * Deletes a user by ID, either permanently or via soft delete.
   *
   * **Decorators:**
   * - `@Delete(':id')`: Marks this as a DELETE request to remove a user by their ID.
   * - `@Param()`: Extracts the user ID from the request URL.
   * - `@Query()`: Accepts a query parameter `soft` to specify if it's a soft delete.
   *
   * @param id - The ID of the user to be deleted.
   * @param soft - If true, performs a soft delete; otherwise, a hard delete.
   * @returns A message indicating success or failure.
   */
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a user',
    description: 'Deletes a user by ID, with an option for soft delete.'
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
