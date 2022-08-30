import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { MessagesHelper } from '../../helpers/menssages.helper';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string) {
    const user = await this.authService.validateUser(email);
    console.log(user);

    /*  if (!user)
      throw new UnauthorizedException(MessagesHelper.PASSWORD_OR_EMAIL_INVALID);

    return user; */
  }
}
