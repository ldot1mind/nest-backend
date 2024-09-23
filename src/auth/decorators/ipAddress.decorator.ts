import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CustomRequest } from 'common/interfaces/custom-request.interface';

/**
 * Custom decorator to extract the client's IP address from the request.
 *
 * This decorator checks the 'x-forwarded-for' header to determine the
 * originating IP address of the client, which is particularly useful
 * when the application is behind a proxy or load balancer.
 *
 * In production environments, the IP is taken from the 'x-forwarded-for'
 * header, and it splits the address string to retrieve the first IP,
 * ensuring accuracy. If the IP is not found or the application is
 * running in development, it defaults to '127.0.0.1'.
 *
 * Usage: `@IpAddress()` can be used in route handlers to get the IP
 * address of the client.
 */
export const IpAddress = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<CustomRequest>();

    const ip = request.headers['x-forwarded-for'] as string;

    if (ip && process.env.NODE_ENV === 'production') {
      return ip.split(',')[0].replace(',', '');
    }

    return ip ?? '127.0.0.1';
  }
);
