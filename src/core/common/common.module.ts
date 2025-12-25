import { Module, ValidationPipe } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { VALIDATION_PIPE_OPTIONS } from './util/common.constants';
import { DataResponseInterceptor } from './interceptors/data-response/data-response.interceptor';
import { EnvModule } from 'infrastructure/config/env.module';

/**
 * The `CommonModule` provides shared functionality across the application.
 * It imports the `EnvModule` to handle environment variables and sets up a global
 * validation pipeline using the `ValidationPipe` from NestJS.
 *
 * The validation pipe ensures that all incoming request data is validated according to the
 * defined DTOs (Data Transfer Objects) and applies the validation rules set in `VALIDATION_PIPE_OPTIONS`.
 *
 * This module is designed to encapsulate common configurations and providers that will be used
 * across the entire application.
 */
@Module({
  /**
   * `EnvModule` is imported to ensure that environment variable handling is available across the application.
   */
  imports: [EnvModule],

  /**
   * The `providers` array sets up the global validation pipe and response interceptor.
   * - `APP_PIPE` is a special NestJS token used to apply the validation pipe globally.
   * - `useValue` is used to instantiate the `ValidationPipe` with predefined options from `VALIDATION_PIPE_OPTIONS`.
   * - `APP_INTERCEPTOR` is used to apply the `DataResponseInterceptor` globally, modifying all outgoing responses.
   */
  providers: [
    /* Setting the ValidationPipe globally with custom validation options */
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe(VALIDATION_PIPE_OPTIONS)
    },

    /* Setting the DataResponseInterceptor globally to format outgoing responses */
    {
      provide: APP_INTERCEPTOR,
      useClass: DataResponseInterceptor
    }
  ]
})
export class CommonModule {}
