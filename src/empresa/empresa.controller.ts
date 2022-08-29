import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { EmpresaCadastrarDto } from './dto/empresa.cadastrar.dto';
import { Empresa } from './empresa.entity';
import { EmmpresaService } from './empresa.services';

@Controller('empresa')
@UseGuards(AuthGuard('jwt'))
export class EmpresaController {
  constructor(private readonly empresaService: EmmpresaService) {}

  @Get('listar')
  async findAll(): Promise<Empresa[]> {
    return this.empresaService.findAll();
  }

  @Get(':cnpj')
  async getEmpresa(
    @Param('cnpj', ParseIntPipe) cnpj: string,
  ): Promise<Empresa> {
    return this.empresaService.getEmpresa(cnpj);
  }

  @Post('cadastrar')
  async cadastrar(@Body() body: EmpresaCadastrarDto): Promise<ResultadoDto> {
    return this.empresaService.cadastrar(body);
  }
}
