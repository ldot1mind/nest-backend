import { Injectable } from '@nestjs/common';
import { Session } from 'features/sessions/entities/session.entity';
import { User } from 'features/users/entities/user.entity';
import { CustomAuth } from 'infrastructure/http/interfaces/custom-request.interface';
import { DataSource, Not, Raw } from 'typeorm';
import { IDevice } from './interfaces/device.interface';
import { ISessionWithCurrent } from './interfaces/session-with-current.interface';
import { ISessionsService } from './interfaces/sessions.interface';

@Injectable()
export class SessionsService implements ISessionsService {
  constructor(private readonly dataSource: DataSource) {}

  async create(
    userId: string,
    token: string,
    ip: string,
    device: IDevice
  ): Promise<Session> {
    const session = this.dataSource.getRepository(Session).create({
      owner: {
        id: userId
      },
      ip,
      token,
      device,
      expiryDate: new Date(new Date().setMilliseconds(31 * 24 * 60 * 60 * 1000))
    });

    return await this.dataSource.getRepository(Session).save(session);
  }

  async validate(userId: string, token: string): Promise<Session> {
    const session = await this.dataSource.getRepository(Session).findOne({
      where: {
        token,
        owner: {
          id: userId
        },
        expiryDate: Raw((alias) => `${alias} > NOW()`)
      }
    });

    return session;
  }

  async find({
    user: { id },
    session: { token, ip, expiryDate, device }
  }: CustomAuth): Promise<ISessionWithCurrent[]> {
    const sessions = await this.dataSource.getRepository(Session).find({
      where: {
        owner: { id },
        token: Not(token)
      },
      select: ['device', 'expiryDate', 'ip']
    });

    const currentSession: ISessionWithCurrent = {
      ip,
      expiryDate,
      device,
      current: true
    };

    return [currentSession, ...sessions];
  }

  async remove({ id }: User, token: string): Promise<void> {
    const sessions = await this.dataSource.getRepository(Session).find({
      where: {
        owner: { id },
        token: Not(token)
      }
    });
    await this.dataSource.getRepository(Session).remove(sessions);
  }
}
