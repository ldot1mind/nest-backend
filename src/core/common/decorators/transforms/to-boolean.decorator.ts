import { Transform } from 'class-transformer';

/**
 * The `ToBoolean` decorator transforms a given value into a boolean type based on specific conditions.
 * This is particularly useful for handling values that may come from query parameters or form submissions,
 * where boolean values can be represented as strings (e.g., "true", "false").
 *
 * The transformation logic is encapsulated in the `toBoolean` function, which processes the input value:
 * - Returns `true` for the string "true".
 * - Returns `false` for the string "false".
 * - Returns 'failure' if the value is `null`.
 * - For any other value, it returns the original value.
 *
 * This decorator can be applied to class properties to automatically convert incoming values to booleans.
 */
const toBoolean = (value: unknown) => {
  switch (value) {
    case null:
      return 'failure';

    case 'true':
      return true;

    case 'false':
      return false;

    default:
      return value;
  }
};

/**
 * The `ToBoolean` decorator uses `Transform` from `class-transformer` to apply the `toBoolean` function
 * to the specified property during the transformation process.
 */
export const ToBoolean = () => Transform(({ obj, key }) => toBoolean(obj[key]));
