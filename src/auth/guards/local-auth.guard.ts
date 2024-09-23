import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * The `LocalAuthGuard` class is a custom guard that extends the
 * built-in Passport `AuthGuard` for local authentication.
 *
 * It is responsible for authenticating users using their email and password
 * by leveraging the local strategy provided by Passport.
 *
 * @extends AuthGuard
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  // No additional implementation is required; it uses the base functionality
  // of the AuthGuard to handle local authentication.
}
