import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserRegisterDto } from './dto/usuario.cadastro.dto';
import { User } from './usuario.entity';
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
  async findAll(): Promise<User[]> {
    const users = await this.usuarioService.findAll();

    if (!users) {
      return [];
    }

    return users;
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.usuarioService.findOneById(id);

    if (!user) {
      throw new UserNotFound();
    }
    return user;
  }

  @Post('cadastrar')
  async register(@Body() body: UserRegisterDto) {
    const user = await this.usuarioService.findOne(body.email);

    if (user?.email === body?.email) {
      throw new UserBadRequest('Já existe um usuário com esse email');
    }

    return this.usuarioService.registerUser(body);
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
