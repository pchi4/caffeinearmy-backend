import { HttpException, HttpStatus } from '@nestjs/common';

export class CompanyBadRequest extends HttpException {
  constructor(msg?: string, status?: HttpStatus) {
    super(msg || 'Houve um error', status || HttpStatus.BAD_REQUEST);
  }
}
