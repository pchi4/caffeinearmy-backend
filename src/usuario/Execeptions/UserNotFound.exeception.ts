import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFound extends HttpException {
  constructor(msg?: string, status?: HttpStatus) {
    super(msg || 'Usuário não encontrado', status || HttpStatus.NOT_FOUND);
  }
}
