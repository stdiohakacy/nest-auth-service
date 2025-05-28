import { RegisterCommand } from '@module/auth/application/commands/register/register.command';
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterRestRequestDto } from '../dtos/request/register.rest-request.dto';

@Controller('auth')
export class RestAuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/register')
  async register(@Body() body: RegisterRestRequestDto): Promise<any> {
    await this.commandBus.execute(new RegisterCommand(body));
  }
}
