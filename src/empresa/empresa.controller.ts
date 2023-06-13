import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { EmpresaCadastrarDto } from './dto/empresa.cadastrar.dto';
import { Empresa } from './empresa.entity';
import { EmmpresaService } from './empresa.services';
import { CompanyNotFound } from './Execeptions/CompanyNotFound.execption';
import { CompanyBadRequest } from './Execeptions/CompanyBadRequest';

@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmmpresaService) {}

  @Get('listar')
  async findAll(): Promise<Empresa[]> {
    const companys = this.empresaService.findAll();

    if (!companys) {
      return [];
    }

    return companys;
  }

  @Get(':cnpj')
  async getEmpresa(@Param('cnpj', ParseIntPipe) cnpj: string) {
    const company = await this.empresaService.findByCnpj(cnpj);

    if (!company) {
      throw new CompanyNotFound();
    }

    return company;
  }

  @Post('cadastrar')
  async cadastrar(@Body() body: EmpresaCadastrarDto) {
    const company = await this.empresaService.findByCnpj(body.cnpj);

    if (body?.cnpj === company?.cnpj) {
      throw new CompanyBadRequest('Empresa já cadastrada com esse CNPJ');
    }

    if (body?.email === company?.email) {
      throw new CompanyBadRequest('Empresa já cadastrada com esse email');
    }

    return this.empresaService.cadastrar(body);
  }
}
