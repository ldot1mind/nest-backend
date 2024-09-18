import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomUser } from 'common/interfaces/custom-request.interface';
import { Device } from 'common/interfaces/device.interface';
import { SessionService } from 'session/session.service';
import { User } from 'users/entities/user.entity';
import { JwtPayload } from './../common/interfaces/jwt-payload.interface';
import { RegisterUserDto } from './dto/register-user.dto';
import { HashingService } from './hashing/hashing.service';
import { UsersService } from 'users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly sessionService: SessionService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly jwtService: JwtService
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    try {
      // Create user
      const user = await this.usersService.create({ ...registerUserDto });

      // return it
      return user;
    } catch (error) {
      throw error;
    }
  }

  async login(user: User, ip: string, device: Device) {
    const payload = { id: user.id };
    // generate jwt token
    const token = this.jwtService.sign(payload);

    // create new session
    await this.sessionService.create(user.id, token, ip, device);

    // return user data and jwt token
    return {
      ...user,
      token: this.jwtService.sign(payload)
    };
  }

  async getProfile(id: string) {
    // Find user
    const user = await this.usersService.findOneById(id);

    // Remove id form user object and return it
    delete user.id;
    return user;
  }

  // async changePassword(
  //   id: string,
  //   { currentPassword, newPassword }: ChangePasswordDto
  // ) {
  //   const user = await this.usersService.findOne({ id }, ['password']);

  //   // Check valid password
  //   const isMatch = await this.hashingService.compare(
  //     currentPassword,
  //     user.password
  //   );

  //   // If invalid password, handle it
  //   if (!isMatch) throw new UnauthorizedException('invalid password');

  //   // If the new password is different from the current password
  //   if (currentPassword !== newPassword)
  //     await this.userRepository.update({ id }, { password: newPassword });
  // }

  async validateLocal(email: string, password: string) {
    // Find user with email or username
    const user = await this.usersService.findOne(
      [{ email }, { username: email }],
      ['id', 'role', 'status', 'password']
    );

    // If doesn't exists, handle it
    if (!user) throw new NotFoundException('User not found');

    // Check user status
    // if (user.status !== UserStatus.ACTIVATE)
    //   throw new UnauthorizedException(
    //     `Your account is ${user.status.toLowerCase()} see support for reviewing your account`
    //   );

    // Check valid password
    const isMatch = await this.hashingService.compare(password, user.password);

    // If invalid password, handle it
    if (!isMatch) throw new UnauthorizedException('invalid password');

    // Return user without password
    delete user.password;
    return user;
  }

  async validateJwt({ id }: JwtPayload, jwtToken: string) {
    // Find user with id
    const user = await this.usersService.findOneById(id);

    // If doesn't exists, handle it
    if (!user) throw new UnauthorizedException();

    // Checking that the session has not expired
    const session = await this.sessionService.validate(user.id, jwtToken);

    // If it had expired, handle it
    if (!session) throw new UnauthorizedException();

    // return userId and session
    const res: CustomUser = { id, session };

    return res;
  }
}
