import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { EmpresaController } from './empresa.controller';
import { EmmpresaService } from './empresa.services';
import { empresaProviders } from './empresa.providers';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  controllers: [EmpresaController],
  providers: [...empresaProviders, EmmpresaService],
})
export class EmpresaModule {}
