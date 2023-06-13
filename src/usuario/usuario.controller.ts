import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Param,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { UsuarioCadastrarDto } from './dto/usuario.cadastro.dto';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { UserNotFound } from './Execeptions/UserNotFound.exeception';
import { UserBadRequest } from './Execeptions/UserBadRequest.exeception';
import { UserUnauthorized } from './Execeptions/UserUnauthorized.exeception';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private authService: AuthService,
  ) {}

  @Get('listar')
  async findAll(): Promise<Usuario[]> {
    const users = await this.usuarioService.findAll();

    if (!users) {
      return [];
    }

    return users;
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    const user = await this.usuarioService.findOneById(id);

    if (!user) {
      throw new UserNotFound();
    }
    return user;
  }

  @Post('cadastrar')
  async cadastrar(@Body() body: UsuarioCadastrarDto) {
    const user = await this.usuarioService.findOne(body.email);

    if (user?.email === body?.email) {
      throw new UserBadRequest('Já existe um usuário com esse email');
    }

    return this.usuarioService.cadastrar(body);
  }

  @Post('login')
  async login(@Body() data: AuthDto) {
    const token = await this.authService.validateUser(
      data.email,
      data.password,
    );

    if (!token) {
      throw new UserUnauthorized();
    }

    return token;
  }
}
