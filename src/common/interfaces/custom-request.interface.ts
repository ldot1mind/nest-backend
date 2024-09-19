import { Request } from 'express';
import { Session } from 'session/entities/session.entity';
import { User } from 'users/entities/user.entity';

export interface CustomAuth {
  readonly user: User;
  readonly session: Session;
}

export interface CustomRequest extends Request {
  readonly auth: CustomAuth;
}
