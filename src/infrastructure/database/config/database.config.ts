import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

/**
 * This script registers the database configuration for use within a NestJS application.
 * It uses the `registerAs` function from the `@nestjs/config` module to create a named
 * configuration ('database'), which can be accessed throughout the app.
 *
 * The configuration is designed for PostgreSQL and uses environment variables to define
 * the connection URL. It also sets `autoLoadEntities` to true, which automatically loads
 * all entities without the need for explicit imports.
 */
export default registerAs('database', () => {
  /**
   * The configuration object for TypeORM, specifically set up for PostgreSQL.
   * - `type`: Defines the database type, 'postgres' in this case.
   * - `autoLoadEntities`: Automatically loads all entities registered within the module,
   *   simplifying entity management.
   * - `url`: The connection string for the PostgreSQL database, loaded from the `DATA_SOURCE_URL`
   *   environment variable. This string includes all necessary details like host, port,
   *   username, password, and database name.
   *
   * The `satisfies` keyword ensures that this configuration adheres to the `TypeOrmModuleOptions` interface,
   * providing type safety and enforcing correct configuration structure.
   */
  const config = {
    type: 'postgres',
    autoLoadEntities: true,
    url: process.env.DATA_SOURCE_URL
  } as const satisfies TypeOrmModuleOptions;

  return config;
});
