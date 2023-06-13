import { HttpException, HttpStatus } from '@nestjs/common';

export class CompanyNotFound extends HttpException {
  constructor(msg?: string, status?: HttpStatus) {
    super(msg || 'Empresa não encontrada', status || HttpStatus.NOT_FOUND);
  }
}
