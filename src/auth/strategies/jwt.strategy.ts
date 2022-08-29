import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromResquest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secreTOrKey: 'mi9yD13hPdHdUOoWwMmE89PhfoGxQJovB2fyf9dBF1s=',
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, email: payload.email };
  }
}
