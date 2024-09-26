import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, Length } from 'class-validator';
import { IsPassword } from 'common/decorators/validators/is-password.decorator';
import { IsUsername } from 'common/decorators/validators/is-username.decorator';
import { UserStatus } from 'common/enums/user-status.enum';

/**
 * CreateUserDto defines the structure and validation rules for creating a new user.
 * It ensures that the data provided during user creation meets the necessary requirements.
 */
export class CreateUserDto {
  /**
   * The email address of the user. This is a required property that must be a valid email format.
   *
   * @example 'test@gmail.com'
   */
  @ApiProperty({
    description: 'A valid email address for the user',
    example: 'test@gmail.com'
  })
  @IsEmail()
  readonly email: string;

  /**
   * The username for the user. This is a required property and must adhere to specific formatting and length constraints.
   *
   * Allowed characters include lowercase letters, numbers, and special characters (_).
   * The length must be between 3 and 30 characters.
   *
   * @example 'test_122'
   */
  @ApiProperty({
    description:
      'Username consisting of lowercase characters, numbers, & special characters (_), with a length between 3 and 30 characters',
    example: 'test_122'
  })
  @IsUsername()
  readonly username: string;

  /**
   * The password for the user account. This is a required property with specific content and length requirements.
   *
   * The password must include numbers, letters, special characters (@#$%^!&*(_+)=)
   * and must be between 8 and 20 characters in length.
   *
   * @example 'test@1234'
   */
  @ApiProperty({
    description:
      'Password must include numbers, letters, special characters (@#$%^!&*(_+)=), and must be between 8 and 20 characters long',
    example: 'test@1234'
  })
  @IsPassword()
  readonly password: string;

  /**
   * Optional status property indicating the user's current status.
   * It can take one of the specific enum values defined in UserStatus.
   *
   * Possible values are: 'ACTIVATE', 'DEACTIVATE', and 'SUSPEND'.
   *
   * @example 'ACTIVATE'
   */
  @ApiPropertyOptional({
    enum: UserStatus,
    description:
      "User's current status, possible values: 'ACTIVATE', 'DEACTIVATE', or 'SUSPEND'",
    example: 'ACTIVATE'
  })
  @IsOptional()
  @IsEnum(UserStatus)
  readonly status?: UserStatus;

  /**
   * Optional name property for the user, limited to a maximum length of 30 characters.
   *
   * @example 'mohmadreza test'
   */
  @ApiPropertyOptional({
    description: 'User name, limited to a maximum of 30 characters',
    example: 'mohmadreza mosalli'
  })
  @IsOptional()
  @Length(0, 30)
  readonly name?: string;
}
