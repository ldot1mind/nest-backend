import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { Device } from 'core/common/interfaces/device.interface';
import { User as UserEntity } from 'features/users/entities/user.entity';
import { AuthService } from './auth.service';
import { IpAddress } from './decorators/ipAddress.decorator';
import { Public } from './decorators/public.decorator';
import { UserAgent } from './decorators/userAgent.decorator';
import { User } from './decorators/user.decorator';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CustomAuth } from 'core/common/interfaces/custom-request.interface';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { LoginResponseDto } from './dto/login-response.dto';
import { Response } from 'express';

/**
 * The `AuthController` handles incoming requests related to authentication.
 * It provides endpoints for user registration, login, profile retrieval, and password changes.
 * The controller utilizes guards to protect certain routes and enforces authentication where necessary.
 */
@Controller({ path: 'auth', version: '1' })
@ApiTags('auth')
export class AuthController {
  /**
   * Constructor for `AuthController` class.
   *
   * @param authService - Injected service responsible for handling authentication-related operations.
   * This service provides methods for user registration, login, profile retrieval, and password changes.
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * Handles user registration by accepting a registration DTO and passing it to the `AuthService`.
   * Public endpoint, no authentication required.
   *
   * **Decorators:**
   * - `@Public()`: Marks this route as accessible without authentication.
   * - `@Post('register')`: Defines this as a POST request to the `/auth/register` route.
   * - `@UseInterceptors(ClassSerializerInterceptor)`: Automatically serializes the response to remove sensitive fields.
   * - `@Body()`: Extracts the incoming request body and maps it to the `RegisterUserDto`.
   *
   * @param registerUserDto - The DTO containing user registration details.
   * @returns The created user entity with basic information.
   */
  @Public()
  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: RegisterUserDto // Adjust to your response DTO
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data'
  })
  @ApiInternalServerErrorResponse({
    description: 'Unexpected error occurred'
  })
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  /**
   * Authenticates a user using the local strategy and returns a JWT token for future requests.
   * Public endpoint, but uses the `LocalAuthGuard` to validate user credentials before proceeding.
   *
   * **Decorators:**
   * - `@Public()`: Marks this route as public, meaning it doesn't require JWT-based authentication.
   * - `@HttpCode(HttpStatus.OK)`: Forces the response to use HTTP status code 200 (OK) for successful login.
   * - `@UseGuards(LocalAuthGuard)`: Uses the `LocalAuthGuard` to validate the user credentials (e.g., username and password).
   * - `@UseInterceptors(ClassSerializerInterceptor)`: Serializes the user entity, removing sensitive fields like passwords.
   * - `@User()`: Injects the authenticated user entity (from the local strategy) into the method.
   * - `@IpAddress()`: Injects the user's IP address using a custom decorator.
   * - `@UserAgent()`: Injects the user's device information (like browser or OS) using a custom decorator.
   *
   * @param user - The authenticated user entity.
   * @param ip - The IP address of the user.
   * @param device - The user's device information.
   * @returns The user object and a JWT token for authentication.
   */
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'Successfully logged in',
    type: LoginResponseDto
  })
  @ApiBadRequestResponse({
    description: 'Invalid credentials'
  })
  async login(
    @User() user: UserEntity,
    @IpAddress() ip: string,
    @UserAgent() device: Device,
    @Res() res: Response
  ) {
    const data = await this.authService.login(user, ip, device);

    res.cookie('jwt', data.token, {
      httpOnly: true, // Prevent JavaScript access
      secure: true, // Use HTTPS in production
      sameSite: 'strict', // Helps prevent CSRF
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds
    });

    console.log('data', data);
    return res.status(200).end();
    // return data;
  }

  /**
   * Retrieves the authenticated user's profile information.
   * Protected by the `JwtAuthGuard`, which ensures that only authenticated users can access this route.
   *
   * **Decorators:**
   * - `@UseGuards(JwtAuthGuard)`: Requires the user to be authenticated with a valid JWT token before accessing this route.
   * - `@Get('profile')`: Defines this as a GET request to the `/auth/profile` route.
   * - `@UseInterceptors(ClassSerializerInterceptor)`: Automatically serializes the user entity to hide sensitive fields.
   * - `@User('user')`: Injects the authenticated user entity into the method using a custom decorator.
   *
   * @param user - The authenticated user entity.
   * @returns The user's profile with non-sensitive information.
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
    type: UserEntity
  })
  getProfile(@User('user') user: UserEntity) {
    return this.authService.getProfile(user);
  }

  /**
   * Changes the user's password after validating the current password.
   * Protected by the `JwtAuthGuard`, ensuring only authenticated users can perform this action.
   *
   * **Decorators:**
   * - `@HttpCode(HttpStatus.OK)`: Ensures that the response will have a 200 (OK) status code after a successful password change.
   * - `@UseGuards(JwtAuthGuard)`: Protects the route, requiring a valid JWT token for access.
   * - `@Post('change-password')`: Defines this as a POST request to the `/auth/change-password` route.
   * - `@User()`: Injects the authenticated user's data, including custom authentication context, into the method.
   * - `@Body()`: Extracts the request body and maps it to the `ChangePasswordDto`.
   *
   * @param authData - The authentication context containing user and session data.
   * @param changePasswordDto - The DTO containing current and new password details.
   * @returns A confirmation message indicating successful password change.
   */
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  @ApiOperation({
    summary: 'Change user password',
    description:
      'This endpoint allows the user to change their password. The current password must be provided for validation.'
  })
  @ApiResponse({
    status: 204,
    description: 'Password changed successfully'
  })
  @ApiBadRequestResponse({
    description:
      'Invalid input data, including an incorrect current password or other validation errors'
  })
  @ApiUnauthorizedResponse({
    description:
      'Unauthorized: User must be authenticated to change the password'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error'
  })
  changePassword(
    @User() authData: CustomAuth,
    @Body() changePasswordDto: ChangePasswordDto
  ) {
    return this.authService.changePassword(authData, changePasswordDto);
  }
}
