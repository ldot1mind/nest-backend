import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';

/**
 * AppModule is the root module of the NestJS application.
 * It imports various feature modules, defines controllers,
 * and provides services required by the application.
 */
@Module({
  imports: [DatabaseModule]
})
export class InfrastructureModule {}
