import { Global, Module } from '@nestjs/common';
import { RequestModule } from './request/request.module';
import { LoggerModule } from './logger/logger.module';
import { MessageModule } from './message/message.module';

@Global()
@Module({
  imports: [RequestModule.forRoot(), LoggerModule, MessageModule.forRoot()],
})
export class SharedModule {}
