import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import jwtConfig from './config/jwt.config';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { BcryptProvider } from './providers/bcrypt.provider';
import { HashingProvider } from './providers/hashing.provider';
import { LoginValidationMiddleware } from './middlewares/login-validation.middleware';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from 'users/users.module';
import { SessionsModule } from 'sessions/sessions.module';

/**
 * The `AuthModule` is responsible for managing authentication functionalities within the application.
 * It imports necessary modules, registers providers, and sets up guards for protecting routes.
 * This module handles user registration, login, JWT management, and session control.
 */
@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    forwardRef(() => UsersModule),
    forwardRef(() => SessionsModule)
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider
    },
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
  exports: [HashingProvider]
})
export class AuthModule implements NestModule {
  /**
   * Configures middleware for the authentication module.
   * This includes applying the login validation middleware specifically to the login route.
   *
   * @param consumer - The middleware consumer to apply the middleware to specific routes.
   */
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('auth/login');
  }
}
