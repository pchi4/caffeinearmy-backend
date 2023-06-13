import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { EmpresaController } from './empresa.controller';
import { CompanyService } from './empresa.services';
import { empresaProviders } from './empresa.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [EmpresaController],
  providers: [...empresaProviders, CompanyService],
})
export class EmpresaModule {}
