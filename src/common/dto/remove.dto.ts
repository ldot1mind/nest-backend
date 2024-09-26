import { ApiPropertyOptional } from '@nestjs/swagger';
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
   * The 'soft' property indicates whether the delete operation should
   * be a soft delete. This property is optional and should be of type boolean.
   */
  @ApiPropertyOptional({
    /**
     * Description of the 'soft' property, clarifying that it is optional
     * and defines the behavior of the delete operation.
     */
    description:
      'The "soft" property is optional and indicates whether to perform a soft delete.'
  })

  /**
   * Indicates that the 'soft' property is optional in the request.
   * If not provided, the default delete behavior will apply.
   */
  @IsOptional()

  /**
   * Validates that the 'soft' property, if provided, must be a boolean value.
   * This ensures that the input meets the expected data type requirements.
   */
  @IsBoolean()

  /**
   * Declares the property as read-only, meaning it cannot be modified
   * after the instance of this DTO is created. This is a common practice
   * for request DTOs to maintain data integrity.
   */
  readonly soft: boolean;
}
