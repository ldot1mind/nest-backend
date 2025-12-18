import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SessionsModule } from './sessions/sessions.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule, SessionsModule]
})
export class FeaturesModule {}
