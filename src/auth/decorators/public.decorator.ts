import { SetMetadata } from '@nestjs/common';

/**
 * The `IS_PUBLIC_KEY` constant is a unique identifier used in conjunction with the
 * `Public` decorator to mark routes as public.
 *
 * This key is crucial for route guards to identify whether a particular route
 * should bypass authentication checks. By setting the metadata key to `true`,
 * it clearly indicates that the route is open to all users, regardless of their
 * authentication status.
 */
export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Custom decorator to mark a route as public.
 *
 * When applied to a route handler, this decorator sets a metadata
 * key (`isPublic`) to `true`, indicating that the route should be
 * accessible without authentication.
 *
 * This is useful for public endpoints, such as login and registration,
 * where no authentication is required.
 *
 * Usage: `@Public()` can be used above route handler methods.
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
