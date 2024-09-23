import { Device } from 'common/interfaces/device.interface';

/**
 * SessionWithCurrent interface represents a session with additional information
 * indicating if it's the current session.
 */
export interface SessionWithCurrent {
  ip: string;
  expiryDate: Date;
  device: Device;

  // Optional field that marks if this is the current session
  current?: boolean;
}
