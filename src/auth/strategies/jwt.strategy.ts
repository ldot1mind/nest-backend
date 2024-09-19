import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from 'auth/auth.service';
import jwtConfig from 'auth/config/jwt.config';
import { JwtPayload } from 'auth/interfaces/jwt-payload.interface';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfiguration.secret,
      passReqToCallback: true
    });
  }

  validate(req: Request, payload: JwtPayload) {
    return this.authService.validateJwt(
      payload,
      req.headers?.authorization.replace('bearer ', '')
    );
  }
}
