import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, match, Ok, Result } from 'oxide.ts';
import { Inject } from '@nestjs/common';
import { UserGrpcPort } from '@module/auth/application/ports/outbound/user.grpc.port';
import { PasswordVO } from '@module/auth/domain/value-object/password.vo';
import { USER_SRV_GRPC_PORT } from 'src/di/di.token';
import { RegisterCommand } from '../register.command';
import { AuthEmailAlreadyRegisteredError } from '@module/auth/domain/errors/auth.error';

@CommandHandler(RegisterCommand)
export class RegisterCommandHandler
  implements
    ICommandHandler<
      RegisterCommand,
      Result<{ id: string }, AuthEmailAlreadyRegisteredError>
    >
{
  constructor(
    @Inject(USER_SRV_GRPC_PORT)
    private readonly userGrpcPort: UserGrpcPort,
  ) {}
  async execute(
    command: RegisterCommand,
  ): Promise<Result<{ id: string }, AuthEmailAlreadyRegisteredError>> {
    const { dto } = command;
    const { name, email, password } = dto;
    const passwordVO = await PasswordVO.createFromRaw(password);

    return this.userGrpcPort.createUser({
      email,
      name,
      password: passwordVO.hashed,
    });
  }
}
