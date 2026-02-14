import { User } from '@features/users/entities/user.entity';
import { CustomAuth } from '@infrastructure/http/interfaces/custom-request.interface';
import { Session } from '../entities/session.entity';
import { IDevice } from './device.interface';
import { ISessionWithCurrent } from './session-with-current.interface';

export interface ISessionsService {
  getActive(userId: string, token: string): Promise<Session | null>;
  issue(userId: string, ip: string, device: IDevice): Promise<string>;
  list(customAuth: CustomAuth): Promise<ISessionWithCurrent[]>;
  revoke(user: User, token: string): Promise<void>;
  terminateOthers(user: User, token: string): Promise<void>;
}
