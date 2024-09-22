import { IsEmail, IsEnum, IsOptional, Length } from 'class-validator';
import { IsPassword } from 'common/decorators/validators/is-password.decorator';
import { IsUsername } from 'common/decorators/validators/is-username.decorator';
import { UserStatus } from 'common/enums/user-status.enum';

/**
 * CreateUserDto defines the structure and validation rules for creating a new user.
 * It ensures that the data provided during user creation meets the necessary requirements.
 */
export class CreateUserDto {
  /** The email of the user, which must be a valid email format */
  @IsEmail()
  readonly email: string;

  /** The username of the user, validated by a custom decorator to ensure it meets username requirements */
  @IsUsername()
  readonly username: string;

  /** The user's password, validated by a custom decorator to ensure it meets password strength criteria */
  @IsPassword()
  readonly password: string;

  /** The status of the user, optional, and must be a valid enum value from the UserStatus enum */
  @IsOptional()
  @IsEnum(UserStatus)
  readonly status?: UserStatus;

  /** The name of the user, optional, and limited to a maximum of 30 characters */
  @IsOptional()
  @Length(0, 30)
  readonly name?: string;
}
