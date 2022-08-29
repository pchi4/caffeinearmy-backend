import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { UsuarioCadastrarDto } from './dto/usuario.cadastro.dto';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('listar')
  async findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Post('cadastrar')
  async cadastrar(@Body() body: UsuarioCadastrarDto): Promise<ResultadoDto> {
    return this.usuarioService.cadastrar(body);
  }
}
