import { ApiProperty } from '@nestjs/swagger';
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
   * The 'id' property represents a unique identifier for a user or resource.
   * This identifier must be a string and must conform to the UUID format.
   */
  @ApiProperty({
    /**
     * Description of the ID property, specifying that it must be a string
     * and adhere to the UUID format. This helps ensure correct usage
     * when interacting with the API.
     */
    description: 'The ID must be a string that conforms to the UUID format'
  })

  /**
   * Ensures the value assigned to 'id' is of type string.
   * This validation helps catch type errors early in the request lifecycle.
   */
  @IsString()

  /**
   * Validates that the string is a valid UUID.
   * This ensures that the ID follows the expected UUID structure,
   * which is critical for unique identification of resources.
   */
  @IsUUID()

  /**
   * Declares the property as read-only, meaning it cannot be modified
   * after the instance of this DTO is created. This is a common practice
   * for ID fields to ensure data integrity.
   */
  readonly id: string;
}
