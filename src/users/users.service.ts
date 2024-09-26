import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ErrorResponseDto } from 'common/dto/error-reponse.dto';

/**
 * The UsersService class is responsible for handling business logic related to user management.
 * It provides methods to create, retrieve, update, and delete user data, using a TypeORM repository.
 */
@Injectable()
export class UsersService {
  /**
   * Creates an instance of the UsersService.
   *
   * @param userRepository - The TypeORM repository used to interact with the User entity in the database.
   * This repository provides methods for performing CRUD operations on user data.
   */
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  /**
   * Creates a new user in the database.
   * @param createUserDto - Data Transfer Object containing user creation details.
   * @returns The created user entity.
   * @throws UnprocessableEntityException if a user with duplicate fields (like email) already exists.
   * @throws ServiceUnavailableException for any other errors during user creation.
   */
  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userRepository.create({
        ...createUserDto
      });

      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code == 23505) {
        // Handle unique constraint violation (e.g., duplicate email)
        const parts = error.detail.split(
          /Key \(|\)=\(|\)\s*already exists\.?\s*$/
        );

        throw new HttpException(
          new ErrorResponseDto(
            HttpStatus.UNPROCESSABLE_ENTITY,
            'User already exists',
            'Unprocessable Entity',
            '/users',
            `${parts[1]} ${parts[2]} already exists`
          ),
          HttpStatus.UNPROCESSABLE_ENTITY
        );
      }

      throw new HttpException(
        new ErrorResponseDto(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'An unexpected error occurred',
          'Internal Server Error',
          '/users'
        ),
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Retrieves all users from the database.
   * @returns An array of user entities.
   */
  async findAll() {
    return await this.userRepository.find();
  }

  /**
   * Retrieves a single user based on specified conditions.
   * @param where - Condition(s) to find a user.
   * @param select - Optional array of fields to retrieve (default: basic user info).
   * @returns The found user entity.
   * @throws NotFoundException if no user matches the conditions.
   */
  async findOne(
    where: FindOptionsWhere<User> | FindOptionsWhere<User>[],
    select: (keyof User)[] = [
      'id',
      'email',
      'name',
      'password',
      'role',
      'status',
      'username'
    ]
  ) {
    const user = await this.userRepository.findOne({ where, select });

    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  /**
   * Retrieves a user by their ID.
   * @param id - The ID of the user.
   * @returns The found user entity.
   */
  async findOneById(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(
        new ErrorResponseDto(
          404,
          `User with ID ${id} not found`,
          'Not Found',
          `/users/${id}`
        )
      );
    }

    return user;
  }

  /**
   * Updates an existing user's information.
   * @param id - The ID of the user to update.
   * @param updateUserDto - Data Transfer Object containing updated user details.
   * @returns The result of the update operation.
   * @throws NotFoundException if the user with the specified ID does not exist.
   * @throws UnprocessableEntityException if there is a validation issue, such as unique constraint violations.
   * @throws ServiceUnavailableException for any unexpected errors.
   */
  async update(id: string, updateUserDto: UpdateUserDto) {
    // First, check if the user exists before attempting to update
    const existingUser = await this.userRepository.findOneBy({ id });

    if (!existingUser) {
      throw new NotFoundException(
        new ErrorResponseDto(
          404,
          `User with ID ${id} not found`,
          'Not Found',
          `/users/${id}`
        )
      );
    }
    try {
      await this.userRepository.update({ id }, { ...updateUserDto });
    } catch (error) {
      if (error.code == 23505) {
        // Handle unique constraint violation (e.g., duplicate email)
        const parts = error.detail.split(
          /Key \(|\)=\(|\)\s*already exists\.?\s*$/
        );

        throw new HttpException(
          new ErrorResponseDto(
            HttpStatus.UNPROCESSABLE_ENTITY,
            'User already exists',
            'Unprocessable Entity',
            '/users',
            `${parts[1]} ${parts[2]} already exists`
          ),
          HttpStatus.UNPROCESSABLE_ENTITY
        );
      }

      throw new HttpException(
        new ErrorResponseDto(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'An unexpected error occurred',
          'Internal Server Error',
          '/users'
        ),
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Removes a user from the database.
   * Supports both soft deletion (user is marked as deleted but not removed) and permanent deletion (user is fully removed from the database).
   *
   * @param id - The UUID of the user to remove.
   * @param soft - Boolean flag indicating whether to perform a soft delete (true) or a hard delete (false).
   *                - Soft delete: The user is marked as deleted but remains in the database.
   *                - Hard delete: The user is permanently removed from the database.
   * @returns An object containing a success message and a flag indicating whether the operation was a soft delete or a hard delete.
   * @throws NotFoundException - If the user with the specified ID is not found.
   * @throws ConflictException - If the user cannot be deleted due to related data (e.g., foreign key constraints).
   * @throws InternalServerErrorException - If an unexpected error occurs during the delete operation.
   */
  async remove(id: string, soft: boolean) {
    // Check if the user exists before attempting to delete
    const user = await this.findOneById(id);

    if (!user) {
      // User not found, throw a NotFoundException
      throw new NotFoundException(
        new ErrorResponseDto(
          404,
          `User with ID ${id} not found`,
          'Not Found',
          `/users/${id}`
        )
      );
    }

    try {
      // Attempt to delete the user (soft or hard based on the 'soft' flag)
      if (soft) {
        // Soft delete (marks the user as deleted without actually removing from DB)
        await this.userRepository.softRemove(user);
      } else {
        // Hard delete (permanently removes the user from DB)
        await this.userRepository.remove(user);
      }

      // Return a success message or the deleted entity
      return {
        message: `User with ID ${id} deleted successfully`,
        softDeleted: soft
      };
    } catch (error) {
      // Check for specific database errors (e.g., foreign key violations)
      if (error.code === '23503') {
        // Handle foreign key constraint violation (e.g., related entities depend on this user)
        throw new HttpException(
          new ErrorResponseDto(
            HttpStatus.CONFLICT,
            'User cannot be deleted due to related data',
            'Conflict',
            `/users/${id}`
          ),
          HttpStatus.CONFLICT
        );
      }

      // Handle other unexpected errors during the delete operation
      throw new HttpException(
        new ErrorResponseDto(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'An unexpected error occurred during deletion',
          'Internal Server Error',
          `/users/${id}`
        ),
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
