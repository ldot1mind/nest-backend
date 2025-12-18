import { ApiProperty } from '@nestjs/swagger';

/**
 * ErrorResponseDto is a Data Transfer Object (DTO) that defines the structure of
 * error responses returned to clients. It ensures that error information is
 * consistent and includes key details such as the HTTP status code, error message,
 * type of error, and additional context if available.
 *
 * This class is primarily used in the API to send structured error responses
 * to clients, helping with better error handling, debugging, and client-side
 * processing of errors.
 */
export class ErrorResponseDto {
  /**
   * The HTTP status code representing the type of error that occurred.
   * Common status codes include 400 (Bad Request), 404 (Not Found), and 500 (Internal Server Error).
   *
   * @example 400
   */
  @ApiProperty({
    description: 'HTTP status code of the error',
    example: 400
  })
  statusCode: number;

  /**
   * A human-readable message that provides more information about the error.
   * This message is intended to give users a clear explanation of what went wrong.
   *
   * @example 'User already exists'
   */
  @ApiProperty({
    description: 'Description of the error',
    example: 'User already exists'
  })
  message: string;

  /**
   * A string representing the type or name of the error. This could map to specific
   * error types like "BadRequest", "ValidationError", etc.
   *
   * @example 'Unprocessable Entity'
   */
  @ApiProperty({
    description: 'Type of error',
    example: 'Unprocessable Entity'
  })
  error: string;

  /**
   * The timestamp when the error occurred, in ISO 8601 format.
   * This is useful for tracking and logging purposes, especially in debugging scenarios.
   *
   * @example '2024-09-25T14:35:00.000Z'
   */
  @ApiProperty({
    description: 'Timestamp of the error occurrence',
    example: '2024-09-25T14:35:00.000Z'
  })
  timestamp: string;

  /**
   * The API request path that triggered the error. This helps in identifying
   * which endpoint or resource was involved in causing the error.
   *
   * @example '/api/users'
   */
  @ApiProperty({
    description: 'Path of the request that resulted in the error',
    example: '/api/users'
  })
  path: string;

  /**
   * Optional field for providing additional context or details about the error.
   * This could include more specific information that may not be covered by
   * the main error message or type.
   *
   * @example 'The email provided is already in use.'
   * @optional
   */
  @ApiProperty({
    description: 'Additional details regarding the error',
    example: 'The email provided is already in use.',
    required: false
  })
  details?: string;

  /**
   * Constructs a new ErrorResponseDto object. Initializes required fields with provided
   * values and auto-generates the `timestamp` field to reflect the time of the error occurrence.
   *
   * @param statusCode - The HTTP status code associated with the error.
   * @param message - A description of the error.
   * @param error - A string identifying the type of error.
   * @param path - The request path that caused the error.
   * @param details - (Optional) Additional details regarding the error.
   */
  constructor(
    statusCode: number,
    message: string,
    error: string,
    path: string,
    details?: string
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
    this.timestamp = new Date().toISOString();
    this.path = path;
    this.details = details;
  }
}
