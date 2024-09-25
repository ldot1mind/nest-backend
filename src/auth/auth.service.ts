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

/**
 * The `AuthService` class provides services related to user authentication and session management.
 * It handles user registration, login, JWT token generation/validation, password changes, and validation of user credentials.
 */
@Injectable()
export class AuthService {
  /**
   * Constructs the `AuthService` by injecting necessary dependencies such as hashing provider, sessions service,
   * users service, and JWT service for managing authentication and session-related logic.
   *
   * @param hashingProvider - A service for hashing and comparing passwords.
   * @param sessionsService - A service for handling session-related operations.
   * @param usersService - The service responsible for user management.
   * @param jwtService - The service responsible for signing and verifying JWT tokens.
   */
  constructor(
    private readonly hashingProvider: HashingProvider,
    private readonly sessionsService: SessionsService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * Registers a new user with the provided registration details.
   *
   * @param registerUserDto - Data Transfer Object containing user registration information (email, password, etc.).
   * @returns The newly created user entity with sensitive fields removed.
   * @throws Error if the user creation process fails.
   */
  async register(registerUserDto: RegisterUserDto) {
    try {
      return await this.usersService.create({
        ...registerUserDto
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Authenticates the user and initiates a session by generating a JWT token.
   *
   * @param user - The authenticated user entity.
   * @param ip - The IP address of the user logging in.
   * @param device - Information about the device being used to log in.
   * @returns An object containing the authenticated user's details along with the generated JWT token.
   */
  async login(user: User, ip: string, device: Device) {
    const payload: JwtPayload = { email: user.email };

    // Generate a JWT token
    const token: string = this.jwtService.sign(payload);

    // Create a session for the user
    await this.sessionsService.create(user.id, token, ip, device);

    // Return the token
    return {
      token
    };
  }

  /**
   * Retrieves the profile of the authenticated user, omitting sensitive information.
   *
   * @param user - The authenticated user entity.
   * @returns The user's profile with sensitive fields like password and role removed.
   */
  async getProfile(user: User) {
    return user;
  }

  /**
   * Changes the user's password after verifying the current password.
   *
   * @param auth - The authentication context containing the user and session data.
   * @param changePasswordDto - Data Transfer Object containing the current and new passwords.
   * @throws UnauthorizedException if the current password is invalid or the new password is the same as the old one.
   */
  async changePassword(
    { user, session }: CustomAuth,
    { currentPassword, newPassword }: ChangePasswordDto
  ) {
    // Verify that the current password matches
    const isMatch: boolean = await this.hashingProvider.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) throw new UnauthorizedException('Invalid current password');

    // If the passwords are different, update the user's password
    if (currentPassword !== newPassword) {
      await this.usersService.update(user.id, {
        password: newPassword
      });

      // Remove the session after password change
      await this.sessionsService.remove(user, session.token);
    }
  }

  /**
   * Validates the user's credentials for local authentication using email/username and password.
   *
   * @param email - The email or username provided by the user for login.
   * @param password - The password provided by the user.
   * @returns The authenticated user entity.
   * @throws NotFoundException if no user is found with the provided credentials.
   * @throws UnauthorizedException if the password does not match.
   */
  async validateLocal(email: string, password: string) {
    // Find the user by email or username
    const user = await this.usersService.findOne(
      [{ email }, { username: email }],
      ['id', 'role', 'status', 'password', 'email']
    );

    if (!user) throw new NotFoundException('User not found');

    // Validate the user's password
    const isMatch: boolean = await this.hashingProvider.compare(
      password,
      user.password
    );

    if (!isMatch) throw new UnauthorizedException('Invalid password');

    return user;
  }

  /**
   * Validates a JWT token and retrieves the corresponding user and session.
   *
   * @param payload - The decoded JWT payload containing the user's email.
   * @param jwtToken - The JWT token to validate.
   * @returns An object containing the authenticated user and their active session.
   * @throws UnauthorizedException if the token is invalid or the session is not found.
   */
  async validateJwt(
    { email }: JwtPayload,
    jwtToken: string
  ): Promise<CustomAuth> {
    // Find the user associated with the JWT email
    const user = await this.usersService.findOne({ email });

    if (!user) throw new UnauthorizedException();

    // Validate the session using the user's ID and token
    const session = await this.sessionsService.validate(user.id, jwtToken);

    if (!session) throw new UnauthorizedException();

    // Return the authenticated user and session
    return { user, session };
  }
}
