import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { AuthService } from './auth.service';
import { RegisterReqDto } from './dto/register.req.dto';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { AccountLoginResDto } from './dto/login.res.dto';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/role.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly i18n: I18nService,
  ) {}

  @Post('/register')
  @Public()
  register(@Body() registerReqDto: RegisterReqDto) {
    return this.authService.register(registerReqDto);
  }

  @Post('/login')
  @Public()
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  async login(@Request() req): Promise<AccountLoginResDto> {
    return this.authService.login(req.user);
  }

  @Get('/get-verify-jwt')
  getApiJWT() {
    return 'Get jwt success';
  }

  @Get('/get-verify-admin')
  @Roles('admin')
  getApiRole() {
    return 'Get admin success';
  }
}
