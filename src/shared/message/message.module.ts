import { DynamicModule, Global, Module } from '@nestjs/common';
import * as path from 'path';
import { I18nModule, I18nJsonLoader, HeaderResolver } from 'nestjs-i18n';
import { ConfigService } from '@nestjs/config';
import { MessageService } from './services/message.service';

@Global()
@Module({})
export class MessageModule {
  static forRoot(): DynamicModule {
    return {
      module: MessageModule,
      imports: [
        I18nModule.forRootAsync({
          loader: I18nJsonLoader,
          inject: [ConfigService],
          resolvers: [new HeaderResolver(['x-custom-lang'])],
          useFactory: (configService: ConfigService) => ({
            fallbackLanguage: 'en',
            loaderOptions: {
              path: path.join(__dirname, '../languages'),
              watch: true,
            },
          }),
        }),
      ],
      providers: [MessageService],
      exports: [MessageService],
    };
  }
}
