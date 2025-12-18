import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';

/**
 * The `DatabaseModule` is responsible for configuring and managing the application's database connection.
 * It imports the `TypeOrmModule` and sets up the database connection asynchronously using the provided configuration.
 *
 * The `forRootAsync` method allows for dynamic database configuration, which can be particularly useful for loading
 * database settings from external sources like environment variables, external configuration files, or APIs at runtime.
 *
 * This module acts as a centralized entry point for database-related functionality in the application, ensuring that
 * the database connection is properly established and available throughout the app.
 */
@Module({
  /**
   * The `imports` array registers the `TypeOrmModule` and configures it using the async provider method from
   * the `databaseConfig` object. The configuration is dynamically loaded, ensuring flexibility in setting up the database connection.
   */
  imports: [TypeOrmModule.forRootAsync(databaseConfig.asProvider())]
})
export class DatabaseModule {}
