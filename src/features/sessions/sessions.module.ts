import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'features/users/users.module';
import { Session } from './entities/session.entity';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Session]), forwardRef(() => UsersModule)],
  providers: [SessionsService],
  controllers: [SessionsController],
  exports: [SessionsService]
})
export class SessionsModule {}
