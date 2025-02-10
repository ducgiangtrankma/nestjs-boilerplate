import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import * as compression from 'compression';
import helmet from 'helmet';
import { I18nService } from 'nestjs-i18n';
import { AppModule } from './app.module';
import { AppConfig } from './config/app-config.type';
import { AllConfigType } from './config/config.type';
import { ValidationException } from './exceptions/validation.exception';
import { GlobalExceptionFilter } from './filters/global-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Setup security headers
  app.use(helmet());
  // For high-traffic websites in production, it is strongly recommended to offload compression from the application server - typically in a reverse proxy (e.g., Nginx). In that case, you should not use compression middleware.
  app.use(compression());

  const configService = app.get(ConfigService<AllConfigType>);

  const i18nService = app.get(I18nService) as I18nService;

  const port = configService.getOrThrow<AppConfig>('app').port;

  app.useGlobalFilters(new GlobalExceptionFilter(configService, i18nService));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY, // 422
      exceptionFactory: (errors: ValidationError[]) => {
        return new ValidationException(errors);
      },
    }),
  );

  await app.listen(port);

  console.info(`Server running on ${await app.getUrl()}`);
  return app;
}
bootstrap();
