import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { IsPassword } from 'common/decorators/validators/is-password.decorator';
import { IsUsername } from 'common/decorators/validators/is-username.decorator';

/**
 * The `RegisterUserDto` class is used to represent the data transfer object
 * for user registration requests within the application.
 *
 * This class defines the structure of the data required to create a new user
 * account and enforces validation rules to ensure the integrity and security
 * of the input data.
 *
 * Validation Rules:
 * - `email`: Must be a valid email format, which is essential for account
 *   verification and future communication with the user. This is enforced by
 *   the `@IsEmail()` decorator from the `class-validator` library.
 *
 * - `username`: Must adhere to specific criteria set by the `IsUsername`
 *   decorator, ensuring that it meets length and character restrictions.
 *   This helps prevent issues such as invalid usernames that could disrupt
 *   user experience or security.
 *
 * - `password`: Must comply with strong security standards as defined by the
 *   `IsPassword` decorator. This validation ensures that the password is
 *   sufficiently robust to safeguard the user account from unauthorized access.
 *
 * Each of these properties is marked as `readonly`, indicating that their
 * values are intended to be immutable after instantiation of the class.
 */
export class RegisterUserDto {
  /**
   * The user's email address.
   *
   * This field must be a valid email format. It is crucial for account
   * verification and future communication with the user. The validation
   * is enforced by the `@IsEmail()` decorator from the `class-validator`
   * library.
   */
  @ApiProperty({
    description:
      'A valid email address used for account verification and communication.',
    example: 'user@example.com'
  })
  @IsEmail()
  readonly email: string;

  /**
   * The desired username for the new account.
   *
   * This field must meet specific criteria defined by the `IsUsername`
   * decorator. This typically includes length restrictions and rules against
   * invalid characters to ensure a valid and user-friendly username.
   */
  @ApiProperty({
    description:
      'The username for the new account, adhering to specified format criteria.',
    example: 'new_user123'
  })
  @IsUsername()
  readonly username: string;

  /**
   * The password for the new account.
   *
   * This field must comply with robust security standards enforced by the
   * `IsPassword` decorator. It ensures that the password is sufficiently strong
   * to protect the user account from unauthorized access and security threats.
   */
  @ApiProperty({
    description: 'The password must meet the required security standards.',
    example: 'SecurePassword@1234'
  })
  @IsPassword()
  readonly password: string;
}
