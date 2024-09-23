/**
 * The `UserRole` enum defines the roles that a user can have within the application.
 * Enums provide a way to restrict the possible values of a user's role, ensuring consistency
 * throughout the application.
 *
 * The available roles are:
 * - `ADMIN`: A user with administrative privileges who can manage other users and perform high-level tasks.
 * - `USER`: A regular user with standard permissions and limited access.
 */
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}
