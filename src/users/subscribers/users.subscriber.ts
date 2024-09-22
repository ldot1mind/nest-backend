import { HashingProvider } from 'auth/providers/hashing.provider';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent
} from 'typeorm';
import { User } from 'users/entities/user.entity';

@EventSubscriber()
export class UsersSubscriber implements EntitySubscriberInterface<User> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly hashingProvider: HashingProvider
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async beforeInsert({ entity }: InsertEvent<User>) {
    entity.password = await this.hashingProvider.hash(entity.password);
  }

  async beforeUpdate({ entity }: UpdateEvent<User>) {
    entity.password = await this.hashingProvider.hash(entity.password);
  }
}
