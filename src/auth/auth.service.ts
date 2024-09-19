import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomAuth } from 'common/interfaces/custom-request.interface';
import { Device } from 'common/interfaces/device.interface';
import { SessionsService } from 'sessions/sessions.service';
import { User } from 'users/entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { HashingService } from './hashing/hashing.service';
import { UsersService } from 'users/users.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly sessionsService: SessionsService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly jwtService: JwtService
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    try {
      // Create user
      const user = await this.usersService.create({
        ...registerUserDto
      });

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
    await this.sessionsService.create(user.id, token, ip, device);

    // return user data and jwt token
    return {
      ...user,
      token: this.jwtService.sign(payload)
    };
  }

  async getProfile(user: User) {
    delete user.password;
    delete user.id;
    delete user.role;
    delete user.status;

    return user;
  }

  async changePassword(
    { user, session }: CustomAuth,
    { currentPassword, newPassword }: ChangePasswordDto
  ) {
    // Check valid password
    const isMatch = await this.hashingService.compare(
      currentPassword,
      user.password
    );
    // If invalid password, handle it
    if (!isMatch) throw new UnauthorizedException('invalid password');

    // If the new password is different from the current password
    if (currentPassword !== newPassword)
      await this.usersService.update(user.id, {
        password: newPassword
      });

    // remove sessions
    await this.sessionsService.remove(user, session.token);
  }

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

  async validateJwt({ id }: JwtPayload, jwtToken: string): Promise<CustomAuth> {
    // Find user with id
    const user = await this.usersService.findOne({ id });

    // If doesn't exists, handle it
    if (!user) throw new UnauthorizedException();

    // Checking that the session has not expired
    const session = await this.sessionsService.validate(user.id, jwtToken);

    // If it had expired, handle it
    if (!session) throw new UnauthorizedException();

    return { user, session };
  }
}
