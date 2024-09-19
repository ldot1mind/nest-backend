import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomAuth } from 'common/interfaces/custom-request.interface';
import { Device } from 'common/interfaces/device.interface';
import { Session } from 'sessions/entities/session.entity';
import { DataSource, Not, Raw, Repository } from 'typeorm';
import { User } from 'users/entities/user.entity';
import { SessionWithCurrent } from './interfaces/session-wtih-current.interface';

@Injectable()
export class SessionsService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>
  ) {}

  async create(
    userId: string,
    token: string,
    ip: string,
    device: Device
  ): Promise<Session> {
    const session = this.sessionRepository.create({
      owner: {
        id: userId
      },
      ip,
      token,
      device,
      expiryDate: new Date(new Date().setMilliseconds(31 * 24 * 60 * 60 * 1000))
    });

    return await this.sessionRepository.save(session);
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
  }: CustomAuth): Promise<SessionWithCurrent[]> {
    const sessions = await this.sessionRepository.find({
      where: {
        owner: { id },
        token: Not(token)
      },
      select: ['device', 'expiryDate', 'ip']
    });

    const currentSession: SessionWithCurrent = {
      ip,
      expiryDate,
      device,
      current: true
    };

    return [currentSession, ...sessions];
  }

  async remove({ id }: User, token: string): Promise<void> {
    const sessions = await this.sessionRepository.find({
      where: {
        owner: { id },
        token: Not(token)
      }
    });
    await this.sessionRepository.remove(sessions);
  }
}
