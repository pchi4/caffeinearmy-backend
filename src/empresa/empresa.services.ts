import { Inject, Injectable } from "@nestjs/common"
import { Repository } from "typeorm";
import { Empresa } from "./empresa.entity";
import { EmpresaCadastrarDto } from "./dto/empresa.cadastrar.dto";
import { ResultadoDto } from "src/dto/resultado.dto";

@Injectable()
export class EmmpresaService{
    constructor(
        @Inject('EMPRESA_REPOSITORY')
        private empresaRepository: Repository<Empresa>,
    ) {}

    async findAll(): Promise<Empresa[]>{
        return this.empresaRepository.find();
    }

    async cadastrar(data: EmpresaCadastrarDto): Promise<ResultadoDto>{
        let empresa = new Empresa()
                
        empresa.cnpj = data.cnpj
        empresa.nomeFantasia = data.nomeFantasia
        empresa.email = data.email
        empresa.telefone = data.telefone
        empresa.razaoSocial = data.razaoSocial
  
        return this.empresaRepository.save(empresa)
          .then((result)=>{
            return <ResultadoDto>{
              status: true,
              mensage: "Usuario cadastrado com sucesso",
            }
          })
          .catch((error)=>{
            return <ResultadoDto>{
              status: false,
              mensage: "Houve um erro ao cadastar",
            }
          })   
      }
    
}