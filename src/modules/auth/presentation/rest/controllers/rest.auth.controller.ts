import { RegisterCommand } from '@module/auth/application/commands/register/register.command';
import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterRestRequestDto } from '../dtos/request/register.rest-request.dto';
import { match, Result } from 'oxide.ts';
import { AuthEmailAlreadyRegisteredError } from '@module/auth/domain/errors/auth.error';
import { ExceptionBase } from '@base/exceptions';

@Controller('auth')
export class RestAuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/register')
  async register(@Body() body: RegisterRestRequestDto) {
    const result: Result<{ id: string }, AuthEmailAlreadyRegisteredError> =
      await this.commandBus.execute(new RegisterCommand(body));
    return match(result, {
      Ok: (user: { id: string }) => user,
      Err: (error: ExceptionBase) => {
        if (error instanceof AuthEmailAlreadyRegisteredError) {
          throw new ConflictException(error.message);
        }
        throw error;
      },
    });
  }
}
