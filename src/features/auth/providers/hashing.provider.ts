import { Injectable } from '@nestjs/common';

/**
 * The `HashingProvider` is an abstract class defining the contract for hashing providers.
 * It requires implementation of methods for hashing data and comparing hashes.
 *
 * @abstract
 */
@Injectable()
export abstract class HashingProvider {
  /**
   * Hashes the provided data and returns the hashed string.
   *
   * @param data - The data to be hashed (string or buffer).
   * @returns A promise that resolves to the hashed string.
   */
  abstract hash(data: string | Buffer): Promise<string>;

  /**
   * Compares the provided plain text data with an encrypted (hashed) string.
   *
   * @param data - The plain text data to compare (e.g., password).
   * @param encrypted - The hashed value to compare against.
   * @returns A promise that resolves to a boolean indicating if the data matches the hash.
   */
  abstract compare(data: string | Buffer, encrypted: string): Promise<boolean>;
}
