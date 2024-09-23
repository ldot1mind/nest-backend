import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

/**
 * This configuration file defines the JWT settings for the application.
 * It utilizes the NestJS Config module to register JWT-related options
 * that can be injected throughout the application.
 *
 * Configuration Details:
 * - `secret`: The secret key used to sign the JWT tokens, retrieved
 *   from environment variables to enhance security. Ensure this key
 *   is kept confidential and strong to prevent token forgery.
 * - `signOptions`: Contains options for signing the token, such as:
 *   - `expiresIn`: The duration for which the token is valid. Here,
 *     it is set to '7d', meaning the token will expire after 7 days.
 *     This can be adjusted based on security and usability requirements.
 *
 * This configuration is registered under the key 'jwt' and can be accessed
 * via dependency injection in services that require JWT functionality.
 */
export default registerAs('jwt', () => {
  const config = {
    // The secret key for JWT signing
    secret: process.env.JWT_SECRET_KEY,
    signOptions: {
      // Token expiration time
      expiresIn: '7d'
    }
  } as const satisfies JwtModuleOptions;

  return config;
});
