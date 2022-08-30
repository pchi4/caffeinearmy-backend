import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsuarioModule } from '../usuario/usuario.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategys/local.strategy';
import { JwtStrategy } from './strategys/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsuarioModule,
    PassportModule,
    JwtModule.register({
      privateKey: 'secret',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
