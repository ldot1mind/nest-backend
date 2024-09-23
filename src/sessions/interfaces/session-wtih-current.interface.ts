import { Device } from 'common/interfaces/device.interface';

/**
 * The `SessionWithCurrent` interface represents a session with additional information
 * indicating if it is the current active session for the user.
 */
export interface SessionWithCurrent {
  /**
   * The IP address from which the session was initiated.
   */
  ip: string;

  /**
   * The expiration date of the session, indicating when it will no longer be valid.
   */
  expiryDate: Date;

  /**
   * The device used to initiate the session, represented by the `Device` interface.
   * This includes details about the device type and version.
   */
  device: Device;

  /**
   * Optional field that indicates whether this session is the current active session.
   * If true, it can be used to differentiate it from other sessions.
   */
  current?: boolean;
}
