import { Module } from '@nestjs/common';
import { CoreModule } from 'core/core.module';
import { FeaturesModule } from 'features/features.module';
import { InfrastructureModule } from 'infrastructure/infrastructure.module';

/**
 * AppModule is the root module of the NestJS application.
 * It imports various feature modules, defines controllers,
 * and provides services required by the application.
 */
@Module({
  imports: [CoreModule, InfrastructureModule, FeaturesModule]
})
export class AppModule {}
