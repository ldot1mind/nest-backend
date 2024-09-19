import { Device } from 'common/interfaces/device.interface';

export interface SessionWithCurrent {
  ip: string;
  expiryDate: Date;
  device: Device;
  current?: boolean;
}
