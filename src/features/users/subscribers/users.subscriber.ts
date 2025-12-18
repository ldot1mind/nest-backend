import { HashingProvider } from 'features/auth/providers/hashing.provider';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent
} from 'typeorm';
import { User } from 'features/users/entities/user.entity';

/**
 * The `UsersSubscriber` class listens to user-related events in the database,
 * allowing for automatic password hashing during insert and update operations.
 */
@EventSubscriber()
export class UsersSubscriber implements EntitySubscriberInterface<User> {
  /**
   * Creates an instance of the UsersSubscriber.
   *
   * @param dataSource - The data source instance used to interact with the database.
   * @param hashingProvider - The hashing provider used to hash passwords securely.
   */
  constructor(
    private readonly dataSource: DataSource,
    private readonly hashingProvider: HashingProvider
  ) {
    dataSource.subscribers.push(this);
  }

  /**
   * Defines the entity that this subscriber listens to (User).
   * @returns The User entity class.
   */
  listenTo() {
    return User;
  }

  /**
   * Hook executed before a new user is inserted into the database.
   * It hashes the user's password before saving.
   * @param entity - The User entity being inserted.
   */
  async beforeInsert({ entity }: InsertEvent<User>) {
    entity.password = await this.hashingProvider.hash(entity.password);
  }

  /**
   * Hook executed before an existing user is updated in the database.
   * It hashes the updated user's password.
   * @param entity - The User entity being updated.
   */
  async beforeUpdate({ entity }: UpdateEvent<User>) {
    entity.password = await this.hashingProvider.hash(entity.password);
  }
}
