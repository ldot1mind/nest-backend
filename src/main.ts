// Import necessary modules from NestJS and compression middleware
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import compression from 'compression';

/**
 * Define an asynchronous function to bootstrap the application
 */
async function bootstrap() {
  /**
   * Create a new NestJS application instance using the root AppModule
   */
  const app = await NestFactory.create(AppModule);

  /**
   * Use compression middleware to enable gzip compression for responses
   */
  app.use(
    compression({
      // Set compression level (0-9), where 9 is the highest
      level: 6,

      // Only compress if the client supports gzip
      filter: (req) => req.headers['accept-encoding']?.includes('gzip'),

      // Only compress responses larger than 1 KB
      threshold: 1024
    })
  );

  /**
   * Start listening for incoming requests on port 8080
   */
  await app.listen(8080);
}

/**
 * Invoke the bootstrap function to kickstart the application
 */
bootstrap();
