import { Injectable } from '@nestjs/common';
import { Session } from 'features/sessions/entities/session.entity';
import { User } from 'features/users/entities/user.entity';
import { CustomAuth } from 'infrastructure/http/interfaces/custom-request.interface';
import { DataSource, Not, Raw } from 'typeorm';
import { Device } from './interfaces/device.interface';
import { SessionWithCurrent } from './interfaces/session-with-current.interface';
import { ISessionsService } from './interfaces/sessions.interface';

/**
 * SessionsService is responsible for managing user sessions.
 * It provides methods to create, validate, find, and remove sessions.
 */
@Injectable()
export class SessionsService implements ISessionsService {
  /**
   * Constructor for SessionsService.
   * @param dataSource - Provides access to the database.
   * @param sessionRepository - Repository for Session entity.
   */
  constructor(private readonly dataSource: DataSource) {}

  /**
   * Creates a new session for a user.
   * @param userId - ID of the user.
   * @param token - Authentication token for the session.
   * @param ip - IP address of the user.
   * @param device - Device information for the session.
   * @returns The newly created session.
   */
  async create(
    userId: string,
    token: string,
    ip: string,
    device: Device
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

  /**
   * Validates a session by checking the token, user ID, and expiry date.
   * @param userId - ID of the user.
   * @param token - Session token.
   * @returns The valid session if found, otherwise null.
   */
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

  /**
   * Finds sessions for a specific user.
   * Excludes the current session from the result.
   * @param customAuth - Object containing user and session info.
   * @returns A list of sessions with the current session highlighted.
   */
  async find({
    user: { id },
    session: { token, ip, expiryDate, device }
  }: CustomAuth): Promise<SessionWithCurrent[]> {
    const sessions = await this.dataSource.getRepository(Session).find({
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

  /**
   * Removes all sessions for a user except the current session.
   * @param user - The user whose sessions are being removed.
   * @param token - Token of the current session, which should be excluded.
   */
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
