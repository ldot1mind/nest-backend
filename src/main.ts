// Import necessary modules from NestJS and compression middleware
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import compression from 'compression';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Define an asynchronous function to bootstrap the application
 */
async function bootstrap() {
  /**
   * Create a new NestJS application instance using the root AppModule
   */
  const app = await NestFactory.create(AppModule);

  /**
   * Setup Swagger for API documentation and configuration.
   * Swagger provides an interface for users to understand the API's capabilities
   * and test endpoints directly from the documentation.
   */
  const config = new DocumentBuilder()
    /**
     * Set the title of the API documentation.
     * This will be displayed prominently on the Swagger UI.
     */
    .setTitle('The Mintegs API description - BackEnd')

    /**
     * Provide a short description for the API.
     * This should give users an idea of what the API does and how to use it.
     */
    .setDescription('Use the base API URL at http://localhost:8080')

    /**
     * Define the terms of service for the API.
     * This can include contact information or other important legal information.
     */
    .setTermsOfService('Connect with email: mohamadresaaa@gmail.com')

    /**
     * Add the server URL where the API is hosted.
     * This informs users where they can send their requests.
     */
    .addServer('http://localhost:8080')

    /**
     * Set the version of the API.
     * This is useful for users to know which version of the API they are interacting with.
     */
    .setVersion('1')

    /**
     * Add a tag for grouping API endpoints in the documentation.
     * Tags help organize the endpoints for easier navigation within the Swagger UI.
     */
    .addTag('API routes')

    /**
     * Build the documentation configuration using the specified settings.
     * This creates a configuration object that will be used to generate the Swagger documentation.
     */
    .build();

  /**
   * Create a Swagger document based on the app instance and the configuration.
   * This document describes the API, its endpoints, and how they can be used.
   */
  const document = SwaggerModule.createDocument(app, config);

  /**
   * Set up the Swagger module with the specified path ('api') and the created document.
   * This enables the Swagger UI at the defined endpoint, allowing users to explore the API.
   */
  SwaggerModule.setup('api', app, document);

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

  // Enable URI-based versioning
  app.enableVersioning({
    type: VersioningType.URI
  });

  /**
   * Start listening for incoming requests on port 8080
   */
  await app.listen(8080);
}

/**
 * Invoke the bootstrap function to kickstart the application
 */
bootstrap();
