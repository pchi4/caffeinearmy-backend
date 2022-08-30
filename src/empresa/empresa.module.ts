import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { EmpresaController } from './empresa.controller';
import { EmmpresaService } from './empresa.services';
import { empresaProviders } from './empresa.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [EmpresaController],
  providers: [...empresaProviders, EmmpresaService],
})
export class EmpresaModule {}
