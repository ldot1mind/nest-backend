import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'auth/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  /**
   * Creates an instance of RolesGuard.
   *
   * @param reflector - An instance of the Reflector service used to access
   * metadata defined by decorators.
   *
   * The `private readonly` modifier indicates that this parameter is only
   * accessible within the class and cannot be changed after initialization,
   * ensuring the guard's integrity during its lifecycle.
   */
  constructor(private reflector: Reflector) {}

  /**
   * Determines whether the current request is authorized to proceed based on user roles.
   * It checks if the user has one of the roles required by the route, which are defined using
   * the @Roles decorator. If no roles are specified, access is granted by default.
   *
   * @param context The current execution context, providing access to the route handler
   *                and the incoming request.
   * @returns boolean True if the user is authorized, false otherwise.
   */
  canActivate(context: ExecutionContext): boolean {
    // Retrieve the required roles from the route metadata
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    // If no roles are defined, grant access by default
    if (!requiredRoles) {
      console.log('1');
      return true;
    }

    // Extract the user object from the request (assuming it's populated by authentication middleware)
    const { user: data } = context.switchToHttp().getRequest();

    // Deny access if the user object or its role property is missing
    if (!data.user || !data.user.role) {
      return false;
    }

    // Check if the user's role matches any of the required roles for the route
    return requiredRoles.includes(data.user.role);
  }
}
