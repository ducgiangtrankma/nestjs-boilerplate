import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ErrorMessages } from 'src/constants/error-key.constant';

@Injectable()
export class AuthService {
  async register() {
    throw new HttpException(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: ErrorMessages.UserNotFound,
        data: null,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
