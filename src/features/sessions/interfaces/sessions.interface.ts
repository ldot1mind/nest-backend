import { User } from 'features/users/entities/user.entity';
import { Session } from '../entities/session.entity';

export interface ISessionsService {
  validate(userId: string, token: string): Promise<Session | null>;
  create(
    userId: string,
    token: string,
    ip: string,
    device: any
  ): Promise<Session>;
  remove(user: User, token: string): Promise<void>;
}
