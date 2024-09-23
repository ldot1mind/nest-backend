/**
 * The `Device` interface represents a user's device used during a session.
 * It is primarily used to capture and store information about the device in the session entity.
 */
export interface Device {
  /**
   * The name or type of the device (e.g., 'iPhone', 'Windows PC').
   * This field helps identify the device being used, which can be useful for
   * logging, analytics, or security purposes.
   */
  readonly name: string;

  /**
   * (Optional) The version of the device or its operating system, if applicable
   * (e.g., '14.0' for an iPhone). This information can provide insights into
   * the capabilities of the device and assist in troubleshooting.
   */
  readonly version?: string | undefined;
}
