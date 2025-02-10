import { Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';
import { AwsS3Module } from './aws/s3.module';

@Module({
  imports: [RedisModule, AwsS3Module],
})
export class LibsModule {}
