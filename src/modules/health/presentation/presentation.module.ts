import { Module } from '@nestjs/common';
import { RestHealthController } from './rest/controllers/rest.health.controller';

@Module({
  controllers: [RestHealthController],
})
export class PresentationModule {}
