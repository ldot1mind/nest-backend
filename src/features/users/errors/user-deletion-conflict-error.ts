import { DomainError } from 'core/exceptions/domain.error';

export class UserDeletionConflictError extends DomainError {
  readonly code = 'USER_DELETION_CONFLICT';

  constructor(public readonly id: string) {
    super(`User with ID ${id} cannot be deleted due to related data`);
  }
}
