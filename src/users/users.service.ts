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

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      // Create user
      const user = await this.userRepository.create({
        ...createUserDto
      });

      // Save and return it
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code == 23505) {
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

  async findAll() {
    return await this.userRepository.find();
  }

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
    // Find user
    const user = await this.userRepository.findOne({ where, select });

    // If doesn't exists, throw error
    if (!user) throw new NotFoundException('user not found');

    // Otherwise return user
    return user;
  }

  async findOneById(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      // Find user with id and update data
      const user = await this.userRepository.preload({
        id,
        ...updateUserDto
      });

      // If doesn't exists, throw error
      if (!user) {
        throw new NotFoundException('user not found');
      }

      // Otherwise save and return user
      return await this.userRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string, soft: boolean) {
    const user = await this.findOneById(id);

    return soft
      ? await this.userRepository.softRemove(user)
      : await this.userRepository.remove(user);
  }
}
