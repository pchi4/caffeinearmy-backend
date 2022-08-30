import { Injectable } from '@nestjs/common';
import { Usuario } from '../usuario/usuario.entity';
import { UsuarioService } from '../usuario/usuario.service';
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

  async validateUser(email: string) {
    let user: Usuario[];

    console.log(user);
    /*   try {
      user = await this.usuarioService.findOne(email);
    } catch (error) {
      return user;
    } */

    /*     const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;

    return user; */
  }
}
