import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { hashSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usuarioService.findOne(email);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    if (user && bcrypt.compareSync(pass, user.password)) {
      const tokens = await this.gerarToken(user.id, user.email);
      await this.updateRefreshToken(tokens.refreshToken);
      return tokens;
    }
    throw new UnauthorizedException('Usuário ou Senha Inválidos');
  }

  async updateRefreshToken(refreshToken: string) {
    const hashedRefreshToken = await hashSync(refreshToken, 10);
    await this.usuarioService.update(hashedRefreshToken);
    return;
  }

  async gerarToken(userId: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
