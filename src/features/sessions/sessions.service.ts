import { Injectable } from '@nestjs/common';
import { Session } from 'features/sessions/entities/session.entity';
import { User } from 'features/users/entities/user.entity';
import { CustomAuth } from 'infrastructure/http/interfaces/custom-request.interface';
import { DataSource, Not, Raw, Repository } from 'typeorm';
import { IDevice } from './interfaces/device.interface';
import { ISessionWithCurrent } from './interfaces/session-with-current.interface';
import { ISessionsService } from './interfaces/sessions.interface';

@Injectable()
export class SessionsService implements ISessionsService {
  constructor(private readonly dataSource: DataSource) {}

  private get sessionRepo(): Repository<Session> {
    return this.dataSource.getRepository(Session);
  }

  async issue(
    userId: string,
    token: string,
    ip: string,
    device: IDevice
  ): Promise<Session> {
    const session = this.sessionRepo.create({
      owner: {
        id: userId
      },
      ip,
      token,
      device,
      expiryDate: new Date(new Date().setMilliseconds(31 * 24 * 60 * 60 * 1000))
    });

    return this.sessionRepo.save(session);
  }

  async getActive(userId: string, token: string): Promise<Session | null> {
    return this.sessionRepo.findOne({
      where: {
        token,
        owner: {
          id: userId
        },
        expiryDate: Raw((alias) => `${alias} > NOW()`)
      }
    });
  }

  async list({
    user: { id },
    session: { token, ip, expiryDate, device }
  }: CustomAuth): Promise<ISessionWithCurrent[]> {
    const sessions = await this.sessionRepo.find({
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

  async revoke({ id }: User, token: string): Promise<void> {
    const session = await this.sessionRepo.findOne({
      where: {
        owner: { id },
        token
      }
    });
    await this.sessionRepo.remove(session);
  }

  async terminateOthers({ id }: User, token: string): Promise<void> {
    const sessions = await this.sessionRepo.find({
      where: {
        owner: { id },
        token: Not(token)
      }
    });
    await this.sessionRepo.remove(sessions);
  }
}
