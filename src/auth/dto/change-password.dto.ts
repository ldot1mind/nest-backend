import { ApiProperty } from '@nestjs/swagger';
import { IsPassword } from 'common/decorators/validators/is-password.decorator';

/**
 * The `ChangePasswordDto` class represents the data transfer object
 * used for changing a user's password within the application.
 *
 * This DTO encapsulates the necessary information required to
 * perform a password change operation, ensuring that both
 * the current password and the new password provided by the user
 * meet specific validation criteria.
 *
 * Validation Rules:
 * - `currentPassword`: Must adhere to defined security standards
 *   (e.g., length, complexity) as specified by the `IsPassword` decorator.
 * - `newPassword`: Must also meet the same security standards to
 *   ensure that it is strong and secure.
 */
export class ChangePasswordDto {
  /**
   * The current password of the user.
   *
   * This field must comply with the security standards enforced by
   * the `IsPassword` decorator. It verifies that the user's current
   * password is strong enough to prevent unauthorized changes.
   */
  @ApiProperty({
    description: 'The current password must meet security standards.',
    example: 'StrongPassword@1234'
  })
  @IsPassword()
  readonly currentPassword: string;

  /**
   * The new password to be set for the user account.
   *
   * This field must also adhere to the same security standards as
   * the current password, ensuring that the new password is strong,
   * secure, and meets the application's password complexity requirements.
   */
  @ApiProperty({
    description: 'The new password must also meet security standards.',
    example: 'NewStrongPassword@5678'
  })
  @IsPassword()
  readonly newPassword: string;
}
