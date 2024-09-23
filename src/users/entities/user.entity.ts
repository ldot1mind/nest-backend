import { RegistryDates } from 'common/embedded/registry-dates.embedded';
import { UserRole } from 'common/enums/user-role.enum';
import { UserStatus } from 'common/enums/user-status.enum';
import { Session } from 'sessions/entities/session.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

/**
 * The User entity represents a user in the system.
 * It defines the user's attributes, such as ID, email, username, password, role, and status,
 * and includes relationships with other entities like sessions.
 */
@Entity()
export class User {
  /** The unique identifier for the user, auto-generated as a UUID */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** The user's name, which is optional and not included in select queries by default */
  @Column({ length: 50, nullable: true, select: false })
  name: string;

  /** The user's email address, which must be unique */
  @Column({ unique: true })
  email: string;

  /** The user's unique username, limited to 30 characters */
  @Column({ unique: true, length: 30 })
  username: string;

  /** The user's password, which is not selected in queries by default for security reasons */
  @Column({ select: false })
  password: string;

  /** The status of the user, stored as an enum value, defaulting to "DEACTIVATE" */
  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.DEACTIVATE })
  status: UserStatus;

  /** The role of the user, stored as an enum value, defaulting to "USER" */
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  /** Embedded column for tracking registry dates like creation and deletion timestamps */
  @Column(() => RegistryDates, { prefix: false })
  registryDates: RegistryDates;

  /** Relationship to the Session entity, allowing for soft-removal of related sessions */
  @OneToMany(() => Session, (session) => session.owner, {
    cascade: ['soft-remove', 'recover']
  })
  sessions: Session[];

  /**
   * Getter to check if the user has been soft-deleted by inspecting the deletion timestamp.
   * @returns True if the user is soft-deleted, false otherwise.
   */
  get isDeleted() {
    return !!this.registryDates.deleteAt;
  }
}
