import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
  UnprocessableEntityException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

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

        throw new UnprocessableEntityException(
          `${parts[1]} ${parts[2]} already exists`
        );
      }

      throw new ServiceUnavailableException();
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
    return await this.userRepository.findOneBy({ id });
  }

  /**
   * Updates an existing user's information.
   * @param id - The ID of the user to update.
   * @param updateUserDto - Data Transfer Object containing updated user details.
   * @returns The result of the update operation.
   * @throws Any error encountered during the update operation.
   */
  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.userRepository.update({ id }, { ...updateUserDto });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Removes a user from the database.
   * Supports both soft deletion and permanent deletion.
   * @param id - The ID of the user to remove.
   * @param soft - Boolean flag indicating whether to perform a soft delete (true) or a hard delete (false).
   * @returns The result of the remove operation.
   */
  async remove(id: string, soft: boolean) {
    const user = await this.findOneById(id);

    return soft
      ? // Soft delete (user is marked as deleted)
        await this.userRepository.softRemove(user)
      : // Hard delete (user is permanently removed)
        await this.userRepository.remove(user);
  }
}
