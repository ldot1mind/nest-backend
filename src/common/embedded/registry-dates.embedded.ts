import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * The `RegistryDates` class is a reusable entity that defines the standard timestamp columns for an entity in TypeORM.
 * It includes `createdAt`, `updatedAt`, and `deleteAt` fields, which track when the entity is created, updated, or deleted.
 *
 * This class can be extended by other entities to automatically include the timestamp functionality without repeating code.
 *
 * Columns:
 * - `createdAt`: Automatically set when the entity is created.
 * - `updatedAt`: Automatically updated whenever the entity is modified.
 * - `deleteAt`: Set when the entity is soft-deleted, allowing for soft deletion functionality (i.e., the entity is not physically removed from the database but marked as deleted).
 */
export class RegistryDates {
  /**
   * The timestamp for when the entity was created.
   * This column is automatically set by the database.
   */
  @ApiProperty({
    description: 'The date and time when the entity was created.',
    example: '2023-09-25T12:34:56.789Z'
  })
  @CreateDateColumn()
  createdAt: Date;

  /**
   * The timestamp for when the entity was last updated.
   * This column is automatically updated by the database whenever the entity is modified.
   */
  @ApiProperty({
    description: 'The date and time when the entity was last updated.',
    example: '2023-09-25T14:00:00.000Z'
  })
  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * The timestamp for when the entity was soft-deleted (if applicable).
   * A soft delete marks the entity as deleted without removing it from the database.
   */
  @ApiProperty({
    description:
      'The date and time when the entity was soft-deleted. This is null if not deleted.',
    example: '2023-09-26T09:00:00.000Z',
    nullable: true
  })
  @DeleteDateColumn()
  deleteAt: Date;
}
