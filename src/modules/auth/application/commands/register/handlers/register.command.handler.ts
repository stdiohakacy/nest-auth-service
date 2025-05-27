import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterCommand } from '../register.command';
import { Result } from 'oxide.ts';

@CommandHandler(RegisterCommand)
export class RegisterCommandHandler
  implements ICommandHandler<RegisterCommand, Result<string, any>>
{
  constructor() {}
  execute(command: RegisterCommand): Promise<Result<string, any>> {
    throw new Error('Method not implemented.');
  }
}
