import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Empresa } from './empresa.entity';
import { EmpresaCadastrarDto } from './dto/empresa.cadastrar.dto';
import { ResultadoDto } from 'src/dto/resultado.dto';

@Injectable()
export class EmmpresaService {
  constructor(
    @Inject('EMPRESA_REPOSITORY')
    private empresaRepository: Repository<Empresa>,
  ) {}

  async findAll(): Promise<Empresa[]> {
    return this.empresaRepository.find();
  }

  async findByCnpj(cnpj: string): Promise<Empresa> {
    return this.empresaRepository.findOne({ where: { cnpj: cnpj } });
  }

  async cadastrar(data: EmpresaCadastrarDto): Promise<ResultadoDto> {
    const empresa = new Empresa();

    empresa.cnpj = data.cnpj;
    empresa.nomeFantasia = data.nomeFantasia;
    empresa.email = data.email;
    empresa.telefone = data.telefone;
    empresa.razaoSocial = data.razaoSocial;
    empresa.nomeLojista = data.nomeLojista;
    empresa.emailLojista = data.emailLojista;
    empresa.telefoneLojista1 = data.telefoneLojista1;
    empresa.telefoneLojista2 = data.telefoneLojista2;

    return this.empresaRepository
      .save(empresa)
      .then(() => {
        return <ResultadoDto>{
          status: true,
          message: 'Empresa cadastrada com sucesso',
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
