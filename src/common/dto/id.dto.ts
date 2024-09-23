import { IsString, IsUUID } from 'class-validator';

/**
 * The `IdDto` class is a Data Transfer Object (DTO) used to validate and transfer an entity's unique identifier.
 * This class ensures that the provided `id` is both a valid string and a valid UUID format.
 *
 * The DTO uses decorators from `class-validator` to enforce these validation rules.
 *
 * Fields:
 * - `id`: A required string that must be a valid UUID, ensuring proper formatting and uniqueness.
 */
export class IdDto {
  /**
   * The `id` field represents the unique identifier of an entity.
   * - `@IsString()`: Ensures that the `id` is a string.
   * - `@IsUUID()`: Validates that the `id` is a properly formatted UUID (Universally Unique Identifier).
   */
  @IsString()
  @IsUUID()
  readonly id: string;
}
