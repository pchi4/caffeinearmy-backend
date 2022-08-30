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

  async findOne(email: string): Promise<Usuario> {
    return this.usuarioRepository.findOne({ where: { email: email } });
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async cadastrar(data: UsuarioCadastrarDto): Promise<ResultadoDto>{
    let usuario = new Usuario()
    usuario.name = data.name 
    usuario.email = data.email 
    usuario.password = data.password
    usuario.telefone = data.telefone
    return this.usuarioRepository.save(usuario)
      .then((result)=>{
        return <ResultadoDto>{
          status: true,
          mensage: 'Usuario cadastrado com sucesso',
        };
      })
      .catch((error) => {
        return <ResultadoDto>{
          status: false,
          mensage: 'Houve um erro ao cadastar',
        };
      });
  }
}
