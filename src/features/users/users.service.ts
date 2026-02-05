import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { IUsersService } from './interfaces/users.interface';

@Injectable()
export class UsersService implements IUsersService {
  constructor(private readonly dataSource: DataSource) {}

  private get userRepo(): Repository<User> {
    return this.dataSource.getRepository(User);
  }

  async findByIdentifierForAuth(identifier: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: [{ email: identifier }, { username: identifier }],
      select: ['id', 'email', 'name', 'username', 'password', 'role', 'status']
    });
  }

  async setPassword(userid: string, hashPassword: string): Promise<void> {
    await this.userRepo.update({ id: userid }, { password: hashPassword });
  }

  async register(createUserDto: CreateUserDto): Promise<void> {
    try {
      const user = this.userRepo.create(createUserDto);
      await this.userRepo.save(user);
    } catch (error: any) {
      this.handleUniqueConstraintError(error);
    }
  }

  async list(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException();
    return user;
  }

  async updateProfile(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    const existingUser = await this.findById(id);
    try {
      if (existingUser) await this.userRepo.update({ id }, updateUserDto);
    } catch (error: any) {
      this.handleUniqueConstraintError(error);
    }
  }

  async requestAccountDeletion(userId: string): Promise<void> {
    const user = await this.findById(userId);
    await this.userRepo.softRemove(user);
  }

  private handleUniqueConstraintError(error: any) {
    if (error.code === '23505') {
      const detail: string = error.detail ?? '';

      if (detail.includes('email'))
        throw new UnprocessableEntityException('email already exists');

      if (detail.includes('username'))
        throw new UnprocessableEntityException('username already exists');
    }

    throw error;
  }
}
