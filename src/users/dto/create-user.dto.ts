import { IsEmail, IsEnum, IsOptional, Length } from 'class-validator';
import { IsPassword } from 'common/decorators/validators/is-password.decorator';
import { IsUsername } from 'common/decorators/validators/is-username.decorator';
import { UserStatus } from 'common/enums/user-status.enum';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsUsername()
  readonly username: string;

  @IsPassword()
  readonly password: string;

  @IsOptional()
  @IsEnum(UserStatus)
  readonly status?: UserStatus;

  @IsOptional()
  @Length(0, 30)
  readonly name?: string;
}
