import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Device } from 'common/interfaces/device.interface';

/**
 * Custom decorator to extract the user's device information from the request.
 *
 * This decorator analyzes the 'user-agent' header of the incoming request
 * to determine the device type and version. It supports various operating
 * systems, including iOS, Android, macOS, Windows, and Linux.
 *
 * If the user-agent string doesn't match any known patterns, the device
 * is set to 'unknown'. This information can be valuable for analytics,
 * user experience improvements, and security checks.
 *
 * Usage: `@UserAgent()` can be used in route handlers to get the device
 * information of the client.
 */
export const UserAgent = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Device => {
    const request = ctx.switchToHttp().getRequest();
    const userAgent = request.headers['user-agent'];

    // Default device initialization
    const defaultDevice: Device = {
      name: 'unknown'
    };

    if (!userAgent) {
      return defaultDevice;
    }

    // Define device patterns
    const devicePatterns = [
      {
        name: 'iOS',
        regex: /like Mac OS X/,
        versionRegex: /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/
      },
      {
        name: 'Android',
        regex: /Android/,
        versionRegex: /Android ([0-9\.]+)[\);]/
      },
      {
        name: 'macOS',
        regex: /(Intel|PPC) Mac OS X/,
        versionRegex: /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/
      },
      {
        name: 'Windows',
        regex: /Windows NT/,
        versionRegex: /Windows NT ([0-9\._]+)[\);]/
      },
      {
        name: 'Linux',
        regex: /Linux/i,
        versionRegex: null // No version regex for Linux
      }
    ];

    // Check against patterns
    for (const { name, regex, versionRegex } of devicePatterns) {
      if (regex.test(userAgent)) {
        return {
          name,
          version: versionRegex
            ? userAgent.match(versionRegex)?.[1]?.replace(/_/g, '.')
            : undefined
        };
      }
    }

    return defaultDevice;
  }
);
