import { DomainError } from 'core/exceptions/domain.error';

export class UserNotFoundError extends DomainError {
  readonly code = 'USER_NOT_FOUND';

  constructor(
    public readonly field: 'id' | 'email' | 'username',
    public readonly value: string
  ) {
    super(`User with ${field} "${value}" not found`);
  }
}
