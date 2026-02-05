import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  UseInterceptors
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'features/auth/decorators/user.decorator';
import { User as UserEntity } from 'features/users/entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import {
  ApiChangeProfile,
  ApiDeleteAccount,
  ApiGetProfile
} from './users.swagger';

@Controller({
  path: 'user',
  version: '1'
})
@ApiTags('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiGetProfile()
  @UseInterceptors(ClassSerializerInterceptor)
  getProfile(@User('user') user: UserEntity) {
    return user;
  }

  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiChangeProfile()
  changeProfile(
    @User('user') user: UserEntity,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.updateProfile(user.id, updateUserDto);
  }

  @Delete('delete-account')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiDeleteAccount()
  deleteAccount(@User('user') user: UserEntity) {
    return this.usersService.requestAccountDeletion(user.id);
  }
}
