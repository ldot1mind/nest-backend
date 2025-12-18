import { applyDecorators } from '@nestjs/common';
import {
  IsBoolean as DefaultIsBoolean,
  ValidationOptions
} from 'class-validator';
import { ToBoolean } from '../transforms/to-boolean.decorator';

/**
 * The `IsBoolean` decorator is a custom validation decorator that checks if a value is a boolean.
 * It combines the default `IsBoolean` validator from `class-validator` with the `ToBoolean` transformation
 * to ensure that input values are treated as booleans after conversion.
 *
 * This is particularly useful for validating boolean values from query parameters or forms,
 * allowing the decorator to handle string representations of boolean values (e.g., "true", "false").
 *
 * The `IsBoolean` function applies the default boolean validation and the `ToBoolean` transformation.
 *
 * @param validationOptions Optional validation options to customize the behavior of the validator.
 */
export const IsBoolean = (validationOptions?: ValidationOptions) =>
  applyDecorators(DefaultIsBoolean(validationOptions), ToBoolean());
