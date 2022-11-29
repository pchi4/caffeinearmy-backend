import { Injectable } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService

  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usuarioService.findOne(email);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return user;
  }

  async login(user: any) {
    const payload = { name: user.name, sub: user.id};
    return {
      access_token: this.jwtService.sign(payload),
      id: payload.sub
    }; 
  }
}