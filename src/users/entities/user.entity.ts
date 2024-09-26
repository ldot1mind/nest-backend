import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { RegistryDates } from 'common/embedded/registry-dates.embedded';
import { UserRole } from 'common/enums/user-role.enum';
import { UserStatus } from 'common/enums/user-status.enum';
import { Session } from 'sessions/entities/session.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

/**
 * The `User` entity represents a user within the system. It contains key properties
 * like ID, email, username, password, role, status, and relationships to other entities such as sessions.
 * Many fields are excluded from serialization for security reasons, utilizing the `@Exclude()` decorator.
 */
@Entity()
export class User {
  /**
   * The unique identifier for the user, auto-generated as a UUID.
   * This field is excluded from responses using `@Exclude()` for privacy.
   */
  @ApiProperty({
    description:
      'The unique identifier for the user, auto-generated as a UUID.',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    readOnly: true
  })
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  /**
   * The user's name, which is optional.
   * This field is not included in select queries by default, meaning it must be explicitly requested.
   */
  @ApiPropertyOptional({
    description:
      'The name of the user, which is optional and limited to 50 characters.',
    example: 'John Doe',
    maxLength: 50
  })
  @Column({ length: 50, nullable: true, select: false })
  name: string;

  /**
   * The user's email address, which must be unique across the system.
   * It serves as a primary identifier alongside the username.
   */
  @ApiProperty({
    description: "The user's email address, which must be unique.",
    example: 'user@example.com',
    uniqueItems: true
  })
  @Column({ unique: true })
  email: string;

  /**
   * The user's unique username, which can be up to 30 characters long.
   * This is a required field and must be unique across all users.
   */
  @ApiProperty({
    description:
      'The unique username for the user, with a maximum length of 30 characters.',
    example: 'john_doe_123',
    maxLength: 30,
    uniqueItems: true
  })
  @Column({ unique: true, length: 30 })
  username: string;

  /**
   * The user's password, which is excluded from selection queries by default to ensure security.
   * The `@Exclude()` decorator ensures that it will not be exposed in serialized responses.
   */
  @ApiProperty({
    description:
      "The user's password, which is not returned in responses for security reasons.",
    example: 'P@ssw0rd!',
    writeOnly: true
  })
  @Column({ select: false })
  @Exclude()
  password: string;

  /**
   * The current status of the user, represented by an enum value (`UserStatus`).
   * By default, the user status is set to `DEACTIVATE`.
   * This field is excluded from serialized responses using `@Exclude()`.
   */
  @ApiPropertyOptional({
    description:
      'The current status of the user, such as `ACTIVATE`, `DEACTIVATE`, or `SUSPEND`.',
    enum: UserStatus,
    default: UserStatus.DEACTIVATE,
    example: 'ACTIVATE'
  })
  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.DEACTIVATE })
  @Exclude()
  status: UserStatus;

  /**
   * The role of the user, represented by an enum value (`UserRole`).
   * By default, the user role is set to `USER`.
   * This field is excluded from serialized responses using `@Exclude()`.
   */
  @ApiPropertyOptional({
    description:
      'The role of the user, such as `USER`, `ADMIN`, or `SUPERADMIN`.',
    enum: UserRole,
    default: UserRole.USER,
    example: 'USER'
  })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  @Exclude()
  role: UserRole;

  /**
   * Embedded column that tracks important registry dates such as creation and deletion timestamps.
   * This field is also excluded from serialized responses using `@Exclude()`.
   */
  @ApiProperty({
    description:
      'Embedded registry dates, including creation, update, and deletion timestamps.',
    type: () => RegistryDates,
    readOnly: true
  })
  @Column(() => RegistryDates, { prefix: false })
  @Exclude()
  registryDates: RegistryDates;

  /**
   * Defines a one-to-many relationship with the `Session` entity.
   * This allows for the soft removal and recovery of sessions tied to the user.
   * - `cascade: ['soft-remove', 'recover']`: Automatically cascades soft removal and recovery operations.
   */
  @ApiProperty({
    description: 'The sessions related to this user.',
    type: () => [Session],
    readOnly: true
  })
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
