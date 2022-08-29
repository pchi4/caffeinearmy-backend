import { Injectable } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { compareSync } from 'bcrypt';
import { Usuario } from 'src/usuario/usuario.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user) {
    const payload = { sub: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    let user: Usuario;
    try {
      user = await this.usuarioService.findOne(email);
    } catch (error) {
      return null;
    }

    return user;
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;
  }
}
