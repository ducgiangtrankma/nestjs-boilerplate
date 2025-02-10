//Khai các setup các module
import { ModuleMetadata } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from 'src/api/api.module';
import appConfig from 'src/config/app.config';

export default function generateModulesSet() {
  const imports: ModuleMetadata['imports'] = [
    ConfigModule.forRoot({
      isGlobal: true, // Đảm bảo ConfigModule hoạt động toàn cục
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [appConfig], // Load file config nếu cần
    }),
  ];
  let customModules: ModuleMetadata['imports'] = [];
  customModules = [ApiModule];
  return imports.concat(customModules);
}
