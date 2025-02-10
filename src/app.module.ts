import { Module } from '@nestjs/common';
import generateModulesSet from './utils/modules-set';

@Module({
  imports: generateModulesSet(),
  // imports: [
  //   ConfigModule.forRoot({
  //     isGlobal: true, // Đảm bảo ConfigModule hoạt động toàn cục
  //     envFilePath: `.env.${process.env.NODE_ENV}`,
  //     load: [appConfig], // Load file config nếu cần
  //   }),
  //   AuthModule,
  //   UserModule,
  // ],
  // controllers: [AppController],
  // providers: [AppService, ConfigService],
})
export class AppModule {}
