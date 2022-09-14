import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EmpresaModule } from './empresa/empresa.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [UsuarioModule, EmpresaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
