import {
  buildMessage,
  matches,
  ValidateBy,
  ValidationOptions
} from 'class-validator';

/**
 * The `IsPassword` decorator validates that a given value meets specific password complexity requirements.
 * The password must be between 8 to 20 characters long and include at least one lowercase letter,
 * one uppercase letter, and one special character.
 *
 * This validation helps enforce security policies regarding password strength within the application.
 */
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,20}$/;

const IS_PASSWORD_KEY = 'isPassword';

/**
 * The `isPassword` function checks if the value matches the defined password regex.
 */
const isPassword = (value: string): boolean => matches(value, passwordRegex);

/**
 * The `IsPassword` function creates a custom validator that uses the `isPassword` function to validate the input.
 * It returns a decorator that can be applied to class properties to enforce password requirements.
 *
 * @param validationOptions Optional validation options to customize the error message or behavior.
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
