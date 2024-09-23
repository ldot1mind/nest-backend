import { IsOptional } from 'class-validator';
import { IsBoolean } from 'common/decorators/validators/is-boolean.decorator';

/**
 * The `RemoveDto` class is a Data Transfer Object (DTO) used to handle the removal of an entity.
 * It supports both soft deletion (marking an entity as deleted without removing it from the database)
 * and hard deletion (completely removing the entity from the database).
 *
 * The `soft` field is optional and allows the client to specify whether to perform a soft delete.
 *
 * Fields:
 * - `soft`: A boolean flag indicating whether the deletion should be soft (optional).
 *
 * Decorators from `class-validator` ensure that the `soft` field is valid if provided.
 */
export class RemoveDto {
  /**
   * The `soft` field determines if the deletion should be a soft delete.
   * - `@IsOptional()`: The field is optional and does not need to be provided in the request.
   * - `@IsBoolean()`: Validates that, if provided, the value is a boolean (either `true` or `false`).
   */
  @IsOptional()
  @IsBoolean()
  readonly soft: boolean;
}
