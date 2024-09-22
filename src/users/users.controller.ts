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

/**
 * UsersController handles HTTP requests related to user management.
 * It defines endpoints for creating, retrieving, updating, and deleting users.
 */
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Endpoint to create a new user.
   * @param createUserDto - Data Transfer Object containing user creation details.
   * @returns The created user entity.
   */
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Endpoint to retrieve all users.
   * @returns An array of user entities.
   */
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * Endpoint to retrieve a single user by ID.
   * @param id - The ID of the user.
   * @returns The found user entity.
   */
  @Get(':id')
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
  remove(@Param('id') { id }: IdDto, @Query() { soft }: RemoveDto) {
    return this.usersService.remove(id, soft);
  }
}
