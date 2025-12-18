import {
  buildMessage,
  matches,
  ValidateBy,
  ValidationOptions
} from 'class-validator';

/**
 * The `IsPassword` decorator validates that a given value meets specific password complexity requirements.
 *
 * Password Requirements:
 * - Length: Must be between 8 to 20 characters.
 * - Must include at least:
 *   - One lowercase letter (a-z).
 *   - One uppercase letter (A-Z).
 *   - One special character (e.g., @$!%*?&).
 *
 * This validation helps enforce security policies regarding password strength within the application,
 * ensuring that users create robust passwords that enhance overall security.
 */
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,20}$/;

/**
 * The `IS_PASSWORD_KEY` constant is a unique identifier used for the `IsPassword` validation decorator.
 *
 * This key is essential for the `class-validator` library to recognize and manage the password validation
 * logic associated with the `IsPassword` decorator. By providing a specific identifier, it helps maintain
 * consistency and avoids naming collisions with other validation decorators in the application.
 */
const IS_PASSWORD_KEY = 'isPassword';

/**
 * The `isPassword` function checks if the given value matches the defined password regex.
 *
 * @param value - The string value to validate as a password.
 * @returns A boolean indicating whether the value meets the password requirements.
 */
const isPassword = (value: string): boolean => matches(value, passwordRegex);

/**
 * The `IsPassword` function creates a custom validator that uses the `isPassword` function to validate the input.
 * It returns a decorator that can be applied to class properties to enforce password requirements.
 *
 * @param validationOptions - Optional validation options to customize the error message or behavior.
 * @returns A PropertyDecorator that can be used on class properties.
 *
 * Usage:
 * To use this decorator, apply it to a property in a class that represents a password field, like so:
 *
 * class User {
 *   @IsPassword({ message: 'Password must meet complexity requirements.' })
 *   password: string;
 * }
 */
export const IsPassword = (
  validationOptions?: ValidationOptions
): PropertyDecorator => {
  return ValidateBy({
    name: IS_PASSWORD_KEY,
    validator: {
      validate: (value): boolean => isPassword(value),
      defaultMessage: buildMessage(
        (eachPrefix) => eachPrefix + '$property must be valid',
        validationOptions
      )
    }
  });
};
