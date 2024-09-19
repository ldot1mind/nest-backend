import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomAuth } from 'common/interfaces/custom-request.interface';
import { Device } from 'common/interfaces/device.interface';
import { Session } from 'session/entities/session.entity';
import { DataSource, Not, Raw, Repository } from 'typeorm';
import { User } from 'users/entities/user.entity';

@Injectable()
export class SessionService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(userId: string, token: string, ip: string, device: Device) {
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

  async sessions({ session }: CustomAuth) {
    return await this.userRepository.findOne({
      where: { id: session.id },
      relations: ['session']
    });
  }

  async remove({ id }: User, token: string) {
    const sessions = await this.sessionRepository.find({
      where: {
        owner: { id },
        token: Not(token)
      }
    });

    return await this.sessionRepository.remove(sessions);
  }
}
