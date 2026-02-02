import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from 'features/auth/auth.service';
import jwtConfig from 'features/auth/config/jwt.config';
import { JwtPayload } from 'features/auth/interfaces/jwt-payload.interface';
import { ExtractJwt, Strategy } from 'passport-jwt';

/**
 * The `JwtStrategy` class extends Passport's strategy for JWT authentication.
 * It extracts the JWT from the request's authorization header and validates the token's payload.
 * Upon validation, it invokes the AuthService to check the validity of the JWT and retrieve user information.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * The constructor initializes the JWT strategy with necessary configurations.
   *
   * @param jwtConfiguration - The configuration settings for JWT, injected from the jwtConfig module.
   * @param authService - The AuthService instance, used for validating the JWT payload and retrieving user data.
   */
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly authService: AuthService
  ) {
    super({
      /**
       * Extracts the JWT from the Authorization header as a Bearer token.
       * This allows the strategy to retrieve the token sent by the client.
       */
      jwtFromRequest: ExtractJwt.fromExtractors([
        // Extract from the Authorization header
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        // Extract from cookies
        (req) => {
          return req.cookies['access-token'] || null;
        }
      ]),

      /**
       * The secret key used to verify the authenticity of the JWT.
       * This key is essential for ensuring that the token has not been tampered with.
       */
      secretOrKey: jwtConfiguration.secret,

      /**
       * Indicates that the request object should be passed to the validation callback.
       * This enables access to request-specific data during validation.
       */
      passReqToCallback: true
    });
  }

  /**
   * Validates the JWT payload by calling the AuthService's validateJwt method.
   *
   * This method is invoked after the JWT has been extracted and decoded.
   *
   * @param req - The incoming request object, used to retrieve the JWT.
   * @param payload - The decoded JWT payload containing user information.
   * @returns The result of the authentication process, including user and session data if valid.
   */
  validate(req: Request, payload: JwtPayload) {
    const token =
      req.headers?.authorization?.replace('bearer ', '') ||
      req.cookies['access-token'];

    return this.authService.validateJwt(
      payload,
      /**
       * Extracts the JWT token from the authorization header by removing the 'bearer ' prefix.
       * This is necessary to obtain the raw token for validation.
       */
      token
    );
  }
}
