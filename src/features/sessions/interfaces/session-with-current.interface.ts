import { IDevice } from './device.interface';

export interface ISessionWithCurrent {
  ip: string;
  expiryDate: Date;
  device: IDevice;
  current?: boolean;
}
