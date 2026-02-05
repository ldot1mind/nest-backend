import { ApiProperty } from '@nestjs/swagger';
import { User } from 'features/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IDevice } from '../interfaces/device.interface';
import { SwaggerSessionProperties as SessionProps } from '../sessions.swagger';

@Entity()
export class Session {
  /**
   * The unique identifier for the session.
   * This is automatically generated as a UUID (Universal Unique Identifier).
   */
  @ApiProperty(SessionProps.id)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The session's authentication token.
   * This token is unique and used to identify the session when validating user requests.
   */
  @ApiProperty(SessionProps.token)
  @Column({ unique: true })
  token: string;

  /**
   * JSON object representing the device information for this session.
   * Includes details like the device's type, operating system, browser, etc.
   */
  @ApiProperty(SessionProps.device)
  @Column({ type: 'json' })
  device: IDevice;

  /**
   * The IP address from which the session was initiated.
   * Used to track the user's access point and for security checks.
   */
  @ApiProperty(SessionProps.ip)
  @Column()
  ip: string;

  /**
   * The expiration date of the session, after which it becomes invalid.
   */
  @ApiProperty(SessionProps.expiryDate)
  @Column()
  expiryDate: Date;

  /**
   * The user who owns this session.
   * This establishes a Many-to-One relationship with the `User` entity.
   */
  @ApiProperty(SessionProps.user)
  @ManyToOne(() => User, (user) => user.sessions, { nullable: false })
  owner: User;
}
