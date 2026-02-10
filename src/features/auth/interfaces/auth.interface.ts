import { IDevice } from 'features/sessions/interfaces/device.interface';
import { ChangePasswordDto } from 'features/users/dto/change-password.dto';
import { CustomAuth } from 'infrastructure/http/interfaces/custom-request.interface';
import { LoginUserDto } from '../dto/login-user.dto';
import { RegisterUserDto } from '../dto/register-user.dto';

export interface IAuthService {
  registerUser(registerUserDto: RegisterUserDto): Promise<void>;
  loginUser(
    loginUserDto: LoginUserDto,
    ip: string,
    device: IDevice
  ): Promise<string>;
  changeUserPassword(
    customAuth: CustomAuth,
    changePasswordDto: ChangePasswordDto
  ): Promise<void>;
  validateUserJwt(email: string, token: string): Promise<CustomAuth>;
}
