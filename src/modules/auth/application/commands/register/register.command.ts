import { RestRegisterRequestDto } from '@module/auth/presentation/rest/dtos/request/rest.register.request.dto';
import { ICommand } from '@nestjs/cqrs';

export class RegisterCommand implements ICommand {
  constructor(public readonly dto: RestRegisterRequestDto) {}
}
