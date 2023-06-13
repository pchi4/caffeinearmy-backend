import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Company } from './empresa.entity';
import { CompanyRegisterDto } from './dto/empresa.cadastrar.dto';
import { ResultDto } from 'src/dto/resultado.dto';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('EMPRESA_REPOSITORY')
    private companyRepository: Repository<Company>,
  ) {}

  async findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  async findByCnpj(cnpj: string): Promise<Company> {
    return this.companyRepository.findOne({ where: { cnpj: cnpj } });
  }

  async registerCompany(data: CompanyRegisterDto): Promise<ResultDto> {
    const company = new Company();

    company.cnpj = data.cnpj;
    company.nomeFantasia = data.nomeFantasia;
    company.email = data.email;
    company.telefone = data.telefone;
    company.razaoSocial = data.razaoSocial;
    company.nomeLojista = data.nomeLojista;
    company.emailLojista = data.emailLojista;
    company.telefoneLojista1 = data.telefoneLojista1;
    company.telefoneLojista2 = data.telefoneLojista2;

    return this.companyRepository
      .save(company)
      .then(() => {
        return <ResultDto>{
          status: true,
          message: 'Empresa cadastrada com sucesso',
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
