import { RegisterCommand } from '@module/auth/application/commands/register/register.command';
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { routesV1 } from 'src/configs/app.routes';

@Controller(routesV1.auth.root)
export class RestAuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/register')
  async register(@Body() body: any): Promise<any> {
    await this.commandBus.execute(new RegisterCommand(body));
  }
}
