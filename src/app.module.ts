import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SessionsModule } from './sessions/sessions.module';

/**
 * AppModule is the root module of the NestJS application.
 * It imports various feature modules, defines controllers,
 * and provides services required by the application.
 */
@Module({
  imports: [
    // Common functionality shared across the application
    CommonModule,

    // Database-related functionalities and connections
    DatabaseModule,

    // Authentication features and services
    AuthModule,

    // User management functionalities
    UsersModule,

    // Session management functionalities
    SessionsModule
  ]
})
export class AppModule {}
