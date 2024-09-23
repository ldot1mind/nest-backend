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
import { HashingProvider } from './providers/hashing.provider';
import { UsersService } from 'users/users.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserStatus } from 'common/enums/user-status.enum';

/**
 * The `AuthService` class provides authentication-related functionalities, including user registration,
 * login, profile retrieval, password change, and JWT validation. It interacts with the user and session
 * services to manage authentication processes and maintains security through hashing and JWT strategies.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly hashingProvider: HashingProvider,
    private readonly sessionsService: SessionsService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * Registers a new user with the provided registration data.
   *
   * @param registerUserDto - Data Transfer Object containing user registration details.
   * @returns The created user entity.
   */
  async register(registerUserDto: RegisterUserDto) {
    try {
      const user = await this.usersService.create({
        ...registerUserDto
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Authenticates a user and creates a new session with a JWT token.
   *
   * @param user - The authenticated user entity.
   * @param ip - The IP address of the user.
   * @param device - The device information from which the user is logging in.
   * @returns An object containing user information and the generated JWT token.
   */
  async login(user: User, ip: string, device: Device) {
    const payload: JwtPayload = { id: user.id };

    const token: string = this.jwtService.sign(payload);

    await this.sessionsService.create(user.id, token, ip, device);

    return {
      ...user,
      token
    };
  }

  /**
   * Retrieves the user's profile, omitting sensitive information.
   *
   * @param user - The authenticated user entity.
   * @returns The user profile without sensitive fields.
   */
  async getProfile(user: User) {
    delete user.password;
    delete user.id;
    delete user.role;
    delete user.status;

    return user;
  }

  /**
   * Changes the user's password after validating the current password.
   *
   * @param auth - The authentication context containing user and session data.
   * @param changePasswordDto - Data Transfer Object containing new password information.
   */
  async changePassword(
    { user, session }: CustomAuth,
    { currentPassword, newPassword }: ChangePasswordDto
  ) {
    const isMatch: boolean = await this.hashingProvider.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) throw new UnauthorizedException('invalid password');

    if (currentPassword !== newPassword) {
      await this.usersService.update(user.id, {
        password: newPassword
      });

      await this.sessionsService.remove(user, session.token);
    }
  }

  /**
   * Validates user credentials for local authentication.
   *
   * @param email - The user's email or username.
   * @param password - The user's password.
   * @returns The authenticated user entity.
   */
  async validateLocal(email: string, password: string) {
    const user = await this.usersService.findOne(
      [{ email }, { username: email }],
      ['id', 'role', 'status', 'password']
    );

    if (!user) throw new NotFoundException('User not found');

    if (user.status !== UserStatus.ACTIVATE)
      throw new UnauthorizedException(
        `Your account is ${user.status.toLowerCase()} see support for reviewing your account`
      );

    const isMatch: boolean = await this.hashingProvider.compare(
      password,
      user.password
    );

    if (!isMatch) throw new UnauthorizedException('invalid password');

    delete user.password;
    return user;
  }

  /**
   * Validates a JWT token and retrieves the associated user and session.
   *
   * @param payload - The payload of the JWT token containing user ID.
   * @param jwtToken - The JWT token to validate.
   * @returns The authentication context containing user and session information.
   */
  async validateJwt({ id }: JwtPayload, jwtToken: string): Promise<CustomAuth> {
    const user = await this.usersService.findOne({ id });

    if (!user) throw new UnauthorizedException();

    const session = await this.sessionsService.validate(user.id, jwtToken);

    if (!session) throw new UnauthorizedException();

    return { user, session };
  }
}
