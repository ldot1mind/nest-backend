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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The session's authentication token.
   * This token is unique and used to identify the session when validating user requests.
   * For security reasons, this field must remain unique for each session.
   */
  @Column({ unique: true })
  token: string;

  /**
   * JSON object representing the device information for this session.
   * This typically includes details like the device's type, operating system,
   * browser, and other relevant metadata that helps identify the user's device.
   */
  @Column({ type: 'json' })
  device: Device;

  /**
   * The IP address from which the session was initiated.
   * This is used to track the location or network from which the user accessed the application.
   * It may also be used for security purposes, such as detecting unusual login locations.
   */
  @Column()
  ip: string;

  /**
   * The expiration date of the session.
   * This indicates when the session will no longer be valid.
   * Typically, the session is automatically invalidated once this date is in the past.
   */
  @Column()
  expiryDate: Date;

  /**
   * The user who owns this session.
   * Represents a Many-to-One relationship with the `User` entity, meaning that one user can have multiple sessions.
   * This relationship is essential for linking sessions back to the authenticated user.
   */
  @ManyToOne(() => User, (user) => user.id, {
    nullable: false // Ensures that a session must always be associated with a user.
  })
  owner: User;
}
