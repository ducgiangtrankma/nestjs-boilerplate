import { Body, Controller, Post } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { AuthService } from './auth.service';
import { RegisterReqDto } from './dto/register.req.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly i18n: I18nService,
  ) {}

  @Post('/register')
  register(@Body() registerReqDto: RegisterReqDto) {
    console.log('register controller', registerReqDto);
    return this.authService.register();
  }
}
