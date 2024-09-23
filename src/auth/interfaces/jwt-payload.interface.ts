/**
 * The `JwtPayload` interface defines the structure of the payload
 * contained within a JSON Web Token (JWT).
 *
 * This interface is used to ensure that the JWT payload has the
 * required properties for user identification.
 *
 * @property id - The unique identifier of the user, typically the user's database ID.
 */
export interface JwtPayload {
  // The unique identifier for the user
  readonly id: string;
}
