import { User } from 'features/users/entities/user.entity';

export const SwaggerSessionProperties = {
  id: { description: 'UUID of the user', example: 'uuid', readOnly: true },
  token: {
    description: 'The unique token for this session used for authentication.',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    uniqueItems: true
  },
  device: {
    description:
      'JSON object representing the device details for this session.',
    example: {
      deviceType: 'mobile',
      os: 'iOS',
      browser: 'Safari',
      browserVersion: '14.0'
    }
  },
  ip: {
    description: 'The IP address from which the session was initiated.',
    example: '192.168.1.100'
  },
  expiryDate: {
    description: 'The expiration date of the session.',
    example: '2024-09-25T10:00:00.000Z'
  },
  user: {
    description: 'The user who owns this session.',
    type: () => User
  }
};
