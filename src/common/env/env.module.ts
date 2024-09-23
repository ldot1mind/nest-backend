import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENV_VALIDATION_SCHEMA } from './env.constants';

/**
 * The `EnvModule` is responsible for loading and validating environment variables in the application.
 * It leverages the `ConfigModule` from NestJS to manage configuration settings and ensure
 * that required environment variables are correctly set.
 *
 * The module also validates the environment variables using the `ENV_VALIDATION_SCHEMA`
 * to prevent misconfiguration, making sure that all required environment variables are present and valid.
 * Additionally, `expandVariables` is enabled to support nested environment variables.
 */
@Module({
  /**
   * The `imports` array registers the `ConfigModule` and sets it up to:
   * - `expandVariables`: This option allows for environment variable substitution, enabling variables
   *   to reference other environment variables (e.g., `DATABASE_URL` can contain parts of other variables).
   * - `validationSchema`: This defines the schema used to validate the environment variables, ensuring
   *   that all required variables are correctly set. The validation schema is defined in `ENV_VALIDATION_SCHEMA`.
   */
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      validationSchema: ENV_VALIDATION_SCHEMA
    })
  ]
})
export class EnvModule {}
