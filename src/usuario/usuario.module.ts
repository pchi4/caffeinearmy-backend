import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { UsuarioController } from './usuario.controller';
import { usuarioProviders } from './usuario.providers';
import { UsuarioService } from './usuario.service';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  controllers: [UsuarioController],
  providers: [...usuarioProviders, UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
