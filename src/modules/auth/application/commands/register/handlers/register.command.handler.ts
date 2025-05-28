import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterCommand } from '../register.command';
import { Ok, Result } from 'oxide.ts';
import { Inject } from '@nestjs/common';
import { USER_SRV_GRPC_PORT } from 'src/di/di.token';
import { UserGrpcPort } from '@module/auth/application/ports/outbound/user.grpc.port';
import { PasswordVO } from '@module/auth/domain/value-object/password.vo';

@CommandHandler(RegisterCommand)
export class RegisterCommandHandler
  implements ICommandHandler<RegisterCommand, Result<string, any>>
{
  constructor(
    @Inject(USER_SRV_GRPC_PORT)
    private readonly userGrpcPort: UserGrpcPort,
  ) {}
  async execute(command: RegisterCommand): Promise<any> {
    const { dto } = command;
    const { name, email, password } = dto;
    const passwordVO = await PasswordVO.createFromRaw(password);

    try {
      const user = await this.userGrpcPort.createUser({
        email,
        name,
        password: passwordVO.hashed,
      });

      return Ok(user.id);
    } catch (error) {
      console.error(error);
    }
  }
}
