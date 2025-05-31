import { BaseUniqueEntityId } from '@base/domain/identifier/base.unique-entity.id';
import { AuthAccountAlreadyRegistered } from '@module/auth/domain/errors/auth.error';
import { Result } from 'oxide.ts';
import { Observable } from 'rxjs';

export interface CreateUserInput {
  email: string;
  name: string;
  password: string;
}

export interface CreateUserOutput {
  id: BaseUniqueEntityId;
}

export interface UserGrpcPort {
  createUser(
    data: CreateUserInput,
  ): Promise<Result<CreateUserOutput, AuthAccountAlreadyRegistered>>;
}

export interface UserServiceGrpc {
  CreateUser(data: CreateUserInput): Observable<CreateUserOutput>;
}
