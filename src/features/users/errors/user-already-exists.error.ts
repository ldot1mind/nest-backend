import { DomainError } from 'core/exceptions/domain.error';

export class UserAlreadyExistsError extends DomainError {
  readonly code = 'USER_ALREADY_EXISTS';

  constructor(
    public readonly field: 'email' | 'username',
    public readonly value: string
  ) {
    super(`User with ${field} "${value}" already exists`);
  }
}
