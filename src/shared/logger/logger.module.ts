import { Module, Global } from '@nestjs/common';
import { LoggerModule as PinoModule } from 'nestjs-pino';
import { PinoLoggerAdapter } from './pino.logger.adapter';

@Global()
@Module({
  imports: [
    PinoModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            levelFirst: true,
            translateTime: 'SYS:standard',
          },
        },
      },
    }),
  ],
  providers: [PinoLoggerAdapter],
  exports: [PinoLoggerAdapter],
})
export class LoggerModule {}
