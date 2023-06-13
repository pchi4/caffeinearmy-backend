import { Injectable, Inject } from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { Repository } from 'typeorm';
import { UsuarioCadastrarDto } from './dto/usuario.cadastro.dto';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(email: string): Promise<Usuario | undefined> {
    return this.usuarioRepository.findOne({ where: { email: email } });
  }

  async findOneById(id: number): Promise<Usuario> {
    return this.usuarioRepository.findOne({ where: { id: id } });
  }

  async update(updateRefreshToken: string): Promise<any> {
    const user = new Usuario();

    user.refreshToken = updateRefreshToken;

    return this.usuarioRepository
      .save(user)
      .then(() => {
        return <ResultadoDto>{
          status: true,
          message: 'Refresh token',
        };
      })
      .catch(() => {
        return <ResultadoDto>{
          status: false,
          message: 'Houve um erro ao atulizar o token',
        };
      });
  }

  async cadastrar(data: UsuarioCadastrarDto): Promise<ResultadoDto> {
    const usuario = new Usuario();
    usuario.name = data.name;
    usuario.email = data.email;
    usuario.password = data.password;
    usuario.telefone = data.telefone;
    return this.usuarioRepository
      .save(usuario)
      .then(() => {
        return <ResultadoDto>{
          status: true,
          message: 'Usuario cadastrado com sucesso',
        };
      })
      .catch(() => {
        return <ResultadoDto>{
          status: false,
          message: 'Houve um erro ao cadastar',
        };
      });
  }
}
