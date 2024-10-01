import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'common/enums/user-role.enum';

/**
 * Define a constant key to store roles in the metadata
 */
export const ROLES_KEY = 'roles';

/**
 * The custom Roles decorator will accept one or more roles
 * and associate them with the metadata key defined above.
 */
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
