import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EmpresaModule } from './empresa/empresa.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [ConfigModule.forRoot(), UsuarioModule, EmpresaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
