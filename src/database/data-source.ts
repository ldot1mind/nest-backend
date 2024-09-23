import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { DataSource } from 'typeorm';

// Load and expand environment variables from the .env file
dotenvExpand.expand(dotenv.config());

/**
 * This script configures the database connection using TypeORM and environment variables.
 * It uses `dotenv` to load environment variables from a `.env` file and `dotenv-expand`
 * to expand nested variables within the `.env` file if necessary.
 *
 * The `DataSource` instance defines the database configuration, including the database type (PostgreSQL),
 * the connection URL, and the paths to entities and migrations. This configuration is essential
 * for setting up TypeORM to interact with the PostgreSQL database.
 */
export default new DataSource({
  /**
   * The type of database being used, in this case, 'postgres' for PostgreSQL.
   */
  type: 'postgres',

  /**
   * The database connection URL, which is loaded from the environment variable `DATA_SOURCE_URL`.
   * This URL includes the necessary information to connect to the PostgreSQL database
   * (host, port, username, password, and database name).
   */
  url: process.env.DATA_SOURCE_URL,

  /**
   * The paths to the entity files that TypeORM will use to map database tables to classes.
   * These are the compiled JavaScript or TypeScript files that define the application's entities.
   */
  entities: ['dist/src/**/*.entity{.ts,.js}'],

  /**
   * The paths to migration files, which contain scripts for database schema changes.
   * These migrations are used to update the database structure over time, ensuring that it stays
   * in sync with the application's evolving data models.
   */
  migrations: ['dist/src/database/migrations/*{.ts,.js}']
});
