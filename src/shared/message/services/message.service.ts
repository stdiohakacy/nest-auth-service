import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class MessageService {
  constructor(private readonly i18n: I18nService) {}

  setMessage(path: string): string {
    const language: string = 'en';

    return this.i18n.translate(path, {
      lang: language,
    }) as any;
  }
}
