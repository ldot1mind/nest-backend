/**
 * The `JwtPayload` interface defines the structure of the payload
 * contained within a JSON Web Token (JWT).
 *
 * This interface ensures that the JWT payload includes essential
 * user identification properties required for authentication.
 *
 * @property email - The email of the user, used as a unique identifier for authentication purposes.
 */
export interface JwtPayload {
  /** The email of the user, used as a unique identifier */
  readonly email: string;
}
