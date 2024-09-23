import { Request } from 'express';
import { Session } from 'sessions/entities/session.entity';
import { User } from 'users/entities/user.entity';

/**
 * The `CustomAuth` interface represents the authentication context of a request.
 * It contains the authenticated user and the session information.
 *
 * - `user`: The authenticated `User` object, representing the logged-in user.
 * - `session`: The `Session` object representing the active session associated with the authenticated user.
 */
export interface CustomAuth {
  readonly user: User;
  readonly session: Session;
}

/**
 * The `CustomRequest` interface extends the Express `Request` object by adding
 * an `auth` property. This property contains authentication details such as the
 * authenticated user and their active session.
 *
 * This interface is used to ensure type safety when working with requests that include
 * authentication information.
 */
export interface CustomRequest extends Request {
  readonly auth: CustomAuth;
}
