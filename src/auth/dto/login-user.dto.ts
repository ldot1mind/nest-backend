import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsPassword } from 'common/decorators/validators/is-password.decorator';

/**
 * The `LoginUserDto` class defines the data transfer object
 * for handling user login requests in the application.
 *
 * It captures the essential credentials needed for a user to
 * authenticate themselves and grants access to their account.
 *
 * Validation Rules:
 * - `email`: Must be a non-empty string, indicating that the user
 *   has provided either their email address or username. This
 *   flexibility allows users to log in with either credential.
 * - `password`: Must meet predefined security standards as dictated
 *   by the `IsPassword` decorator, ensuring that the user provides a
 *   strong password for authentication.
 */
export class LoginUserDto {
  /**
   * The user's email address or username.
   *
   * This field must not be empty and must be a string. It allows users
   * to log in using either their email or username, providing flexibility
   * in how users access their accounts.
   */
  @ApiProperty({
    description:
      'The email address or username of the user, must be a non-empty string.',
    example: 'user@example.com'
  })
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  /**
   * The password for the user account.
   *
   * This field must comply with the security standards enforced by the
   * `IsPassword` decorator. It ensures that the password is strong enough
   * to protect the user's account from unauthorized access.
   */
  @ApiProperty({
    description:
      'The password must meet security standards enforced by the application.',
    example: 'SecurePassword@1234'
  })
  @IsPassword()
  readonly password: string;
}
