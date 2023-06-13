import { Injectable, Inject } from '@nestjs/common';
import { ResultDto } from 'src/dto/resultado.dto';
import { Repository } from 'typeorm';
import { UserRegisterDto } from './dto/usuario.cadastro.dto';
import { User } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email: email } });
  }

  async findOneById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id: id } });
  }

  async update(updateRefreshToken: string): Promise<any> {
    const user = new User();

    user.refreshToken = updateRefreshToken;

    return this.userRepository
      .save(user)
      .then(() => {
        return <ResultDto>{
          status: true,
          message: 'Refresh token',
        };
      })
      .catch(() => {
        return <ResultDto>{
          status: false,
          message: 'Houve um erro ao atulizar o token',
        };
      });
  }

  async registerUser(data: UserRegisterDto): Promise<ResultDto> {
    const user = new User();

    user.name = data.name;
    user.email = data.email;
    user.password = data.password;
    user.telefone = data.telefone;
    return this.userRepository
      .save(user)
      .then(() => {
        return <ResultDto>{
          status: true,
          message: 'Usuario cadastrado com sucesso',
        };
      })
      .catch(() => {
        return <ResultDto>{
          status: false,
          message: 'Houve um erro ao cadastar',
        };
      });
  }
}
