import { HttpException, HttpStatus } from '@nestjs/common';

export class UserUnauthorized extends HttpException {
  constructor(msg?: string, status?: HttpStatus) {
    super(msg || 'Error ao fazer o login', status || HttpStatus.UNAUTHORIZED);
  }
}
