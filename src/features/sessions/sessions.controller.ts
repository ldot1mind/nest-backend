import { Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { JwtAuthGuard } from 'features/auth/guards/jwt-auth.guard';
import { User } from 'features/auth/decorators/user.decorator';
import { CustomAuth } from 'infrastructure/http/interfaces/custom-request.interface';

@Controller('sessions')
@UseGuards(JwtAuthGuard)
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get()
  async findAll(@User() customAuth: CustomAuth) {
    return this.sessionsService.find(customAuth);
  }

  @Delete()
  async remove(@User() { user, session }: CustomAuth) {
    return this.sessionsService.remove(user, session.token);
  }
}
