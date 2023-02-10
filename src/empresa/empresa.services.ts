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

  async getEmpresa(cnpj: string): Promise<Empresa> {
    const owner = await this.empresaRepository.findOne({
      where: { cnpj: cnpj },
    });
    if (!owner) {
      throw new UnauthorizedException('Empresa não encontrada');
    }
    return owner;
  }
  async cadastrar(data: EmpresaCadastrarDto): Promise<ResultadoDto> {
    const empresa = new Empresa();

    empresa.cnpj = data.cnpj.replace(/[^\d]+/g, '');
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
          mensage: 'Empresa cadastrada com sucesso',
        };
      })
      .catch(() => {
        return <ResultadoDto>{
          status: false,
          mensage: 'Houve um erro ao cadastar',
        };
      });
  }
}
