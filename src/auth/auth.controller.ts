import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards
} from '@nestjs/common';
import { Device } from 'common/interfaces/device.interface';
import { User as UserEntity } from 'users/entities/user.entity';
import { AuthService } from './auth.service';
import { IpAddress } from './decorators/ipAddress.decorator';
import { Public } from './decorators/public.decorator';
import { UserAgent } from './decorators/user-agent.decorator';
import { User } from './decorators/user.decorator';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CustomAuth } from 'common/interfaces/custom-request.interface';

/**
 * The `AuthController` handles incoming requests related to authentication.
 * It provides endpoints for user registration, login, profile retrieval, and password changes.
 * The controller utilizes guards to protect certain routes and enforces authentication where necessary.
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Registers a new user using the provided registration data.
   *
   * @param registerUserDto - The DTO containing user registration details.
   * @returns The created user entity.
   */
  @Public()
  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  /**
   * Logs in a user, creating a session and returning a JWT token.
   *
   * @param user - The authenticated user entity injected by the `LocalAuthGuard`.
   * @param ip - The user's IP address, retrieved via the `IpAddress` decorator.
   * @param device - The device information, retrieved via the `UserAgent` decorator.
   * @returns An object containing user information and the generated JWT token.
   */
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(
    @User('user') user: UserEntity,
    @IpAddress() ip: string,
    @UserAgent() device: Device
  ) {
    return this.authService.login(user, ip, device);
  }

  /**
   * Retrieves the authenticated user's profile.
   *
   * @param user - The authenticated user entity injected by the `JwtAuthGuard`.
   * @returns The user's profile without sensitive information.
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@User('user') user: UserEntity) {
    return this.authService.getProfile(user);
  }

  /**
   * Changes the user's password after validating the current password.
   *
   * @param authData - The authentication context containing user and session data.
   * @param changePasswordDto - The DTO containing new password information.
   * @returns Confirmation of password change.
   */
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  changePassword(
    @User() authData: CustomAuth,
    @Body() changePasswordDto: ChangePasswordDto
  ) {
    return this.authService.changePassword(authData, changePasswordDto);
  }
}
