import { DataSource } from 'typeorm';
import { Company } from './empresa.entity';

export const empresaProviders = [
  {
    provide: 'EMPRESA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Company),
    inject: ['DATA_SOURCE'],
  },
];
