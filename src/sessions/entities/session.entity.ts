import { ApiProperty } from '@nestjs/swagger';
import { Device } from 'common/interfaces/device.interface';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'users/entities/user.entity';

/**
 * The `Session` entity represents a user session in the system.
 * It stores information about a user's session, including the session's unique token,
 * the device used to initiate the session, the user's IP address, and the session's expiration date.
 *
 * The `Session` entity is linked to a `User` entity via a Many-to-One relationship,
 * indicating that a user can have multiple sessions, but each session belongs to one user.
 * This entity is primarily used to track and manage user sessions for authentication purposes.
 */
@Entity()
export class Session {
  /**
   * The unique identifier for the session.
   * This is automatically generated as a UUID (Universal Unique Identifier).
   */
  @ApiProperty({
    description: 'The unique identifier for the session (UUID).',
    example: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The session's authentication token.
   * This token is unique and used to identify the session when validating user requests.
   */
  @ApiProperty({
    description: 'The unique token for this session used for authentication.',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  @Column({ unique: true })
  token: string;

  /**
   * JSON object representing the device information for this session.
   * Includes details like the device's type, operating system, browser, etc.
   */
  @ApiProperty({
    description:
      'JSON object representing the device details for this session.',
    example: {
      deviceType: 'mobile',
      os: 'iOS',
      browser: 'Safari',
      browserVersion: '14.0'
    }
  })
  @Column({ type: 'json' })
  device: Device;

  /**
   * The IP address from which the session was initiated.
   * Used to track the user's access point and for security checks.
   */
  @ApiProperty({
    description: 'The IP address from which the session was initiated.',
    example: '192.168.1.100'
  })
  @Column()
  ip: string;

  /**
   * The expiration date of the session, after which it becomes invalid.
   */
  @ApiProperty({
    description: 'The expiration date of the session.',
    example: '2024-09-25T10:00:00.000Z'
  })
  @Column()
  expiryDate: Date;

  /**
   * The user who owns this session.
   * This establishes a Many-to-One relationship with the `User` entity.
   */
  @ApiProperty({
    description: 'The user who owns this session.',
    type: () => User
  })
  @ManyToOne(() => User, (user) => user.sessions, { nullable: false })
  owner: User;
}
