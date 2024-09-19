import { HashingService } from 'auth/hashing/hashing.service';
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
    private readonly hashingService: HashingService
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async beforeInsert({ entity }: InsertEvent<User>) {
    entity.password = await this.hashingService.hash(entity.password);
  }

  async beforeUpdate({ entity }: UpdateEvent<User>) {
    entity.password = await this.hashingService.hash(entity.password);
  }
}
