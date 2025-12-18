import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'features/auth/auth.module';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersSubscriber } from './subscribers/users.subscriber';

/**
 * UsersModule is responsible for managing the user-related functionality
 * in the application. It integrates the User entity, controller, service, and
 * any subscribers for user-related events.
 */
@Module({
  imports: [
    // Register the User entity for database interaction
    TypeOrmModule.forFeature([User]),

    // Use forwardRef to handle circular dependency with AuthModule
    forwardRef(() => AuthModule)
  ],
  // Define the UsersController to handle incoming HTTP requests
  controllers: [UsersController],

  // Provide UsersService and UsersSubscriber for dependency injection
  providers: [UsersService, UsersSubscriber],

  // Export UsersService so it can be used by other modules
  exports: [UsersService]
})
export class UsersModule {}
