import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { UsuarioCadastrarDto } from './dto/usuario.cadastro.dto';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';
import { AuthDto } from 'src/auth/dto/auth.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private authService: AuthService,
  ) {}

  @Get('listar')
  async findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.usuarioService.findOneById(id);
  }

  @Post('cadastrar')
  async cadastrar(@Body() body: UsuarioCadastrarDto): Promise<ResultadoDto> {
    return this.usuarioService.cadastrar(body);
  }

  @Post('login')
  async login(@Body() data: AuthDto) {
    return this.authService.validateUser(data.email, data.password);
  }
}
