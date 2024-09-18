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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(
    @User() user: UserEntity,
    @IpAddress() ip: string,
    @UserAgent() device: Device
  ) {
    return this.authService.login(user, ip, device);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@User('id') userId: string) {
    return this.authService.getProfile(userId);
  }

  // @HttpCode(HttpStatus.OK)
  // @UseGuards(JwtAuthGuard)
  // @Post('change-password')
  // changePassword(
  //   @User('id') userId: string,
  //   @Body() changePasswordDto: ChangePasswordDto
  // ) {
  //   return this.authService.changePassword(userId, changePasswordDto);
  // }
}
