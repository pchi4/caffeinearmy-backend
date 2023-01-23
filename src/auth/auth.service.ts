import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from 'src/usuario/usuario.entity';
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

    if(!user){
      throw new UnauthorizedException('Usuário ou Senha Inválidos');
    }

    if (user && bcrypt.compareSync(pass, user.password)) {
      return await this.gerarToken(user)
    }
    throw new UnauthorizedException('Usuário ou Senha Inválidos');
  }

  async gerarToken(payload: Usuario) {
    return {
      access_token: this.jwtService.sign(
        {email: payload.email},
        {
          secret: 'tosdoawoe',
          expiresIn: '50s'
        }
      ),
    }; 
  }
}