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
   * The `createdAt` column automatically captures the date and time when the entity is first created.
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * The `updatedAt` column automatically updates with the current date and time whenever the entity is modified.
   */
  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * The `deleteAt` column records the date and time when the entity is soft-deleted.
   * Soft deletion allows the entity to remain in the database but be marked as deleted, making it recoverable if needed.
   */
  @DeleteDateColumn()
  deleteAt: Date;
}
