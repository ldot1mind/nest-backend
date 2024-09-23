import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from 'auth/auth.service';
import { Strategy } from 'passport-local';

/**
 * The `LocalStrategy` class extends Passport's strategy for local authentication using email and password.
 * It retrieves the username (email) and password from the request and uses the AuthService to validate them.
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  /**
   * The constructor initializes the local authentication strategy.
   *
   * @param authService - The AuthService instance, used to validate user credentials.
   *
   * The `usernameField` option is set to 'email' to specify that the username
   * will be provided in the form of an email address.
   */
  constructor(private readonly authService: AuthService) {
    // Specifies the field used for username
    super({ usernameField: 'email' });
  }

  /**
   * Validates the user credentials by calling the AuthService's validateLocal method.
   *
   * This method is invoked after the user submits their email and password for authentication.
   *
   * @param email - The email provided by the user for authentication.
   * @param password - The password provided by the user for authentication.
   * @returns The authenticated user entity if validation is successful,
   * or throws an error if not (e.g., if credentials are invalid).
   */
  validate(email: string, password: string) {
    return this.authService.validateLocal(email, password);
  }
}
