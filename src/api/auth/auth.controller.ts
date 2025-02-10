import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterReqDto } from './dto/register.req.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() registerReqDto: RegisterReqDto) {
    console.log('register controller', registerReqDto);
    return registerReqDto;
  }
}
