import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HashingProvider } from './hashing.provider';

/**
 * The `BcryptProvider` class implements the `HashingProvider` interface using bcrypt for hashing.
 * It provides methods for hashing passwords and comparing plain text with hashed values.
 *
 * @implements HashingProvider
 */
@Injectable()
export class BcryptProvider implements HashingProvider {
  /**
   * Hashes a given data (string or buffer) using bcrypt.
   *
   * @param data - The data to be hashed (typically a password).
   * @param roundsSalt - The number of salt rounds for hashing (default is 10).
   * @returns A promise that resolves to the hashed string.
   */
  async hash(data: string | Buffer, roundsSalt: number = 10) {
    const getSalt = await bcrypt.genSalt(roundsSalt); // Generates a salt with specified rounds
    return bcrypt.hash(data, getSalt); // Returns the hashed data
  }

  /**
   * Compares a given plain text data with an encrypted (hashed) string.
   *
   * @param data - The plain text data to compare (e.g., password).
   * @param encrypted - The hashed value to compare against.
   * @returns A promise that resolves to a boolean indicating whether the data matches the hash.
   */
  compare(data: string | Buffer, encrypted: string) {
    return bcrypt.compare(data, encrypted); // Returns true if they match, false otherwise
  }
}
