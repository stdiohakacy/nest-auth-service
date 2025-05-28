import { Controller, Get } from '@nestjs/common';
import { routesV1 } from 'src/configs/app.routes';

@Controller(routesV1.health.root)
export class RestHealthController {
  constructor() {}

  @Get('/auth-srv')
  async healthCheck() {
    return {
      status: 'OK',
    };
  }
}
