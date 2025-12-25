import * as Joi from 'joi';

/**
 * The `ENV_VALIDATION_SCHEMA` is a Joi schema used to validate environment variables
 * in the application. This ensures that the necessary environment variables are provided and
 * meet the expected data types, preventing the application from starting with invalid or missing configuration.
 *
 * Each environment variable is validated with the following rules:
 * - `DATA_SOURCE_USERNAME`: The username for the database connection (required).
 * - `DATA_SOURCE_PASSWORD`: The password for the database connection (required).
 * - `DATA_SOURCE_HOST`: The hostname for the database server (required).
 * - `DATA_SOURCE_PORT`: The port number for the database server (required, must be a number).
 * - `DATA_SOURCE_DATABASE`: The name of the database (required).
 * - `DATA_SOURCE_URL`: The full connection URL for the database, typically combining the above credentials (required).
 * - `JWT_SECRET_KEY`: The secret key used for signing JSON Web Tokens (JWT) (required).
 * - `NODE_ENV`: The environment in which the application is running (e.g., 'development', 'production') (required).
 */
export const ENV_VALIDATION_SCHEMA = Joi.object({
  /**
   * The username for the database connection.
   * This is a required string that should match the database user's login credentials.
   */
  DATA_SOURCE_USERNAME: Joi.string().required(),

  /**
   * The password for the database connection.
   * This is a required string that corresponds to the user's password for the database.
   */
  DATA_SOURCE_PASSWORD: Joi.string().required(),

  /**
   * The host address for the database server.
   * This is required and must be a valid hostname or IP address where the database is hosted.
   */
  DATA_SOURCE_HOST: Joi.string().required(),

  /**
   * The port number on which the database server is running.
   * This is required and must be a valid number representing the port used to connect to the database.
   */
  DATA_SOURCE_PORT: Joi.number().required(),

  /**
   * The name of the database to connect to.
   * This is a required string representing the specific database within the server.
   */
  DATA_SOURCE_DATABASE: Joi.string().required(),

  /**
   * The full URL for the database connection.
   * This is a required string that combines the database credentials and host information into a single connection string.
   */
  DATA_SOURCE_URL: Joi.string().required(),

  /**
   * The secret key used for signing JSON Web Tokens (JWT).
   * This is a required string and must be securely set to ensure the integrity and security of JWT authentication.
   */
  JWT_SECRET_KEY: Joi.string().required(),

  /**
   * The environment in which the application is running.
   * This is a required string that must be set to either 'development', 'production', or other recognized environments.
   */
  NODE_ENV: Joi.string().required()
});
