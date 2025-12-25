import { ValidationPipeOptions } from '@nestjs/common';

/**
 * `VALIDATION_PIPE_OPTIONS` defines the configuration options for the global `ValidationPipe`.
 * This object is used to customize how validation is applied to incoming request data.
 *
 * - `whitelist`: Automatically strips out any properties that are not defined in the DTO, ensuring only
 *   validated properties are accepted.
 * - `forbidNonWhitelisted`: Throws an error if any non-whitelisted properties are present in the request body.
 * - `transform`: Automatically transforms payloads to their corresponding types as defined by the DTO.
 * - `transformOptions.enableImplicitConversion`: Allows implicit type conversion (e.g., string to number) based on the DTO types.
 */
export const VALIDATION_PIPE_OPTIONS: ValidationPipeOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  transformOptions: {
    enableImplicitConversion: true
  }
};
