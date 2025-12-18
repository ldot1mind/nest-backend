import { Request } from 'express';
import { Session } from 'features/sessions/entities/session.entity';
import { User } from 'features/users/entities/user.entity';

/**
 * The `CustomAuth` interface represents the authentication context of a request.
 * It contains the authenticated user and the session information.
 */
export interface CustomAuth {
  /**
   * The authenticated `User` object, representing the logged-in user.
   * This object contains user-specific data, such as username, email,
   * roles, and permissions.
   */
  readonly user: User;

  /**
   * The `Session` object representing the active session associated
   * with the authenticated user. This object holds session-related
   * information, such as session ID, timestamps, and any other
   * session-specific data.
   */
  readonly session: Session;
}

/**
 * The `CustomRequest` interface extends the Express `Request` object by adding
 * an `auth` property. This property contains authentication details such as the
 * authenticated user and their active session.
 */
export interface CustomRequest extends Request {
  /**
   * The authentication details associated with the request, including
   * the authenticated user and their active session information.
   * This property allows for type-safe access to the user's authentication context.
   */
  readonly auth: CustomAuth;
}
