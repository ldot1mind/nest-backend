import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Session } from 'features/sessions/entities/session.entity';
import { RegistryDatesOrm } from 'infrastructure/database/embedded/registry-dates.embedded';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique
} from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../enums/user-status.enum';
import { SwaggerUserProperties as UserProps } from '../users.swagger';

/**
 * The `User` entity represents a user within the system. It contains key properties
 * like ID, email, username, password, role, status, and relationships to other entities such as sessions.
 * Many fields are excluded from serialization for security reasons, utilizing the `@Exclude()` decorator.
 */
@Entity()
@Unique('users_email_unique', ['email'])
@Unique('users_username_unique', ['username'])
export class User {
  /**
   * The unique identifier for the user, auto-generated as a UUID.
   * This field is excluded from responses using `@Exclude()` for privacy.
   */
  @ApiProperty(UserProps.id)
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  /**
   * The user's name, which is optional.
   * This field is not included in select queries by default, meaning it must be explicitly requested.
   */
  @ApiPropertyOptional(UserProps.name)
  @Column({ length: 50, nullable: true, select: false })
  name: string;

  /**
   * The user's email address, which must be unique across the system.
   * It serves as a primary identifier alongside the username.
   */
  @ApiProperty(UserProps.email)
  @Column({ unique: true })
  email: string;

  /**
   * The user's unique username, which can be up to 30 characters long.
   * This is a required field and must be unique across all users.
   */
  @ApiProperty(UserProps.username)
  @Column({ unique: true, length: 30 })
  username: string;

  /**
   * The user's password, which is excluded from selection queries by default to ensure security.
   * The `@Exclude()` decorator ensures that it will not be exposed in serialized responses.
   */
  @ApiProperty(UserProps.password)
  @Column({ select: false })
  @Exclude()
  password: string;

  /**
   * The current status of the user, represented by an enum value (`UserStatus`).
   * By default, the user status is set to `DEACTIVATE`.
   * This field is excluded from serialized responses using `@Exclude()`.
   */
  @ApiPropertyOptional(UserProps.status)
  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.DEACTIVATE })
  @Exclude()
  status: UserStatus;

  /**
   * The role of the user, represented by an enum value (`UserRole`).
   * By default, the user role is set to `USER`.
   * This field is excluded from serialized responses using `@Exclude()`.
   */
  @ApiPropertyOptional(UserProps.role)
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  @Exclude()
  role: UserRole;

  /**
   * Embedded column that tracks important registry dates such as creation and deletion timestamps.
   * This field is also excluded from serialized responses using `@Exclude()`.
   */
  @ApiProperty(UserProps.registryDates)
  @Column(() => RegistryDatesOrm, { prefix: false })
  @Exclude()
  registryDates: RegistryDatesOrm;

  /**
   * Defines a one-to-many relationship with the `Session` entity.
   * This allows for the soft removal and recovery of sessions tied to the user.
   * - `cascade: ['soft-remove', 'recover']`: Automatically cascades soft removal and recovery operations.
   */
  @ApiProperty(UserProps.sessions)
  @OneToMany(() => Session, (session) => session.owner, {
    cascade: ['soft-remove', 'recover']
  })
  sessions: Session[];

  /**
   * Checks if the user has been soft-deleted by examining the `deleteAt` timestamp.
   * If the timestamp exists, the user is considered soft-deleted.
   *
   * @returns `true` if the user is soft-deleted, `false` otherwise.
   */
  @ApiProperty({
    description:
      'Determines if the user has been soft-deleted by checking the deletion timestamp.',
    example: true
  })
  get isDeleted() {
    return !!this.registryDates.deleteAt;
  }
}
