/**
 * The `UserStatus` enum represents the various states a user's account can be in.
 * These statuses help define the availability or restrictions placed on a user's account.
 *
 * The available statuses are:
 * - `ACTIVATE`: The user account is active and has full access to the system.
 * - `DEACTIVATE`: The user account is deactivated, meaning the user cannot log in or perform any actions.
 * - `SUSPEND`: The user account is temporarily suspended, which may occur due to policy violations or other reasons.
 */
export enum UserStatus {
  ACTIVATE = 'ACTIVATE',
  DEACTIVATE = 'DEACTIVATE',
  SUSPEND = 'SUSPEND'
}
