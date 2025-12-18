import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

/**
 * The DataResponseInterceptor class is a globally applied interceptor that modifies the structure of
 * HTTP responses in a NestJS application. It implements the NestInterceptor interface, allowing it to
 * intercept and transform responses before they are sent to the client.
 *
 * The primary responsibility of this interceptor is to append an `apiVersion` field to every response,
 * indicating the version of the API being used. The API version is determined from the request itself,
 * and if no version is specified, it defaults to '1'.
 *
 * This interceptor leverages RxJS's `map` operator to modify the response object by wrapping the original
 * response data along with the `apiVersion`, ensuring consistent response formatting across the application.
 *
 * It is typically used in APIs where versioning is important, and response consistency is desired across
 * multiple endpoints.
 */
@Injectable()
export class DataResponseInterceptor implements NestInterceptor {
  /**
   * The intercept method intercepts the execution context and modifies the response.
   *
   * @param context - ExecutionContext gives access to the request and its details.
   * @param next - CallHandler provides a handle() method to delegate to the next action in the pipeline.
   * @returns Observable that wraps the modified response.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    /* Extracting the HTTP request object from the execution context */
    const request = context.switchToHttp().getRequest();

    /* Retrieving the API version from the request, defaulting to '1' if not provided */
    const apiVersion = request.version || '1';

    /**
     * Passing the request to the next handler in the pipeline.
     * The map operator is used to transform the response data by adding an `apiVersion` field.
     */
    return next.handle().pipe(
      map((data) => ({
        apiVersion,
        data
      }))
    );
  }
}
