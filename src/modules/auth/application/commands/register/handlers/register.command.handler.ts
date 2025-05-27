import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterCommand } from '../register.command';
import { Result } from 'oxide.ts';

@CommandHandler(RegisterCommand)
export class RegisterCommandHandler
  implements ICommandHandler<RegisterCommand, Result<string, any>>
{
  constructor() {}
  async execute(command: RegisterCommand): Promise<any> {
    const { dto } = command;
    console.log(dto);

    const { name, email, password } = dto;
  }
}
