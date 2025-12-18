import { ExecutionContext, Injectable } from '@nestjs/common'; // Import necessary decorators and types from NestJS
import { Reflector } from '@nestjs/core'; // Import Reflector to access metadata
import { AuthGuard } from '@nestjs/passport'; // Import AuthGuard for Passport authentication
import { IS_PUBLIC_KEY } from 'features/auth/decorators/public.decorator'; // Import the public key metadata constant

/**
 * The `JwtAuthGuard` class is a custom guard that extends the
 * built-in Passport `AuthGuard` for JWT authentication.
 *
 * It checks whether the current route is public (i.e., does not require authentication)
 * by utilizing a reflector to retrieve the metadata defined by the `@Public()` decorator.
 * If the route is public, it allows the request to proceed; otherwise, it invokes the
 * default JWT authentication mechanism.
 *
 * @extends AuthGuard
 */
@Injectable() // Marks the class as a provider that can be injected
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * Creates an instance of JwtAuthGuard.
   *
   * @param reflector - An instance of the Reflector service used to access
   * metadata defined by decorators. This allows the guard to check if the
   * current route is public (i.e., does not require authentication).
   *
   * The `private readonly` modifier indicates that this parameter is only
   * accessible within the class and cannot be changed after initialization,
   * ensuring the guard's integrity during its lifecycle.
   */
  constructor(private readonly reflector: Reflector) {
    super();
  }

  /**
   * Determines if the request can be activated.
   *
   * @param context - The execution context for the request, containing details about the request and response.
   * @returns A boolean indicating whether the request is allowed.
   */
  canActivate(context: ExecutionContext) {
    /**
     * Check if the current route is marked as public.
     * This retrieves the metadata set by the @Public() decorator,
     * allowing us to determine if authentication is required for this route.
     */
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    /**
     * If the route is public, allow access without authentication.
     * Return true to indicate that the request should proceed.
     */
    if (isPublic) return true;

    /**
     * Otherwise, use the default JWT authentication mechanism.
     * Call the parent method for JWT authentication, which will
     * validate the JWT token and ensure the user is authenticated.
     */
    return super.canActivate(context);
  }
}
