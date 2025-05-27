import { Global, Module } from '@nestjs/common';
import { RequestModule } from './request/request.module';
import { LoggerModule } from './logger/logger.module';

@Global()
@Module({
  imports: [RequestModule.forRoot(), LoggerModule],
})
export class SharedModule {}
