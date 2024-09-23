/**
 * The `Device` interface represents a user's device used during a session.
 * It is primarily used to capture and store information about the device in the session entity.
 *
 * - `name`: The name or type of the device (e.g., 'iPhone', 'Windows PC').
 * - `version`: (Optional) The version of the device or its operating system, if applicable (e.g., '14.0' for an iPhone).
 */
export interface Device {
  readonly name: string;
  readonly version?: string | undefined;
}
