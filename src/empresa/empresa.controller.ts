import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { EmpresaPesquisarDto } from './dto/empresa.pesquisar.dto';
import { Empresa } from './empresa.entity';
import { EmmpresaService } from './empresa.services';

@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmmpresaService) {}

  @Get('listar')
  async findAll(): Promise<Empresa[]>{
    return this.empresaService.findAll()
  }

  @Post('cadastrar')
  async cadastrar(@Body() body : EmpresaPesquisarDto): Promise<ResultadoDto>{
    return this.empresaService.cadastrar(body)
  }
}