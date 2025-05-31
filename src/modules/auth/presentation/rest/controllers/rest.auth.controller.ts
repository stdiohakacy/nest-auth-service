import { RegisterCommand } from '@module/auth/application/commands/register/register.command';
import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RestRegisterRequestDto } from '../dtos/request/rest.register.request.dto';
import { match, Result } from 'oxide.ts';
import { AuthAccountAlreadyRegistered } from '@module/auth/domain/errors/auth.error';
import { ExceptionBase } from '@base/exceptions';
import { IdResponseDto } from '@base/presentation/grpc/response/id.response.dto';
import { BaseUniqueEntityId } from '@base/domain/identifier/base.unique-entity.id';
import { CreateUserOutput } from '@module/auth/application/ports/outbound/user.grpc.port';

@Controller('auth')
export class RestAuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/register')
  async register(@Body() body: RestRegisterRequestDto): Promise<IdResponseDto> {
    const result: Result<CreateUserOutput, AuthAccountAlreadyRegistered> =
      await this.commandBus.execute(new RegisterCommand(body));
    return match(result, {
      Ok: (user: CreateUserOutput) => new IdResponseDto(user.id),
      Err: (error: ExceptionBase) => {
        if (error instanceof AuthAccountAlreadyRegistered) {
          throw new ConflictException(error.message);
        }
        throw error;
      },
    });
  }
}
