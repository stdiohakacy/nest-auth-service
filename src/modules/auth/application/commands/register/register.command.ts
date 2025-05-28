import { RegisterRestRequestDto } from '@module/auth/presentation/rest/dtos/request/register.rest-request.dto';
import { ICommand } from '@nestjs/cqrs';

export class RegisterCommand implements ICommand {
  constructor(public readonly dto: RegisterRestRequestDto) {}
}
