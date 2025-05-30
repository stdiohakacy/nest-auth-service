import { AuthEmailAlreadyRegisteredError } from '@module/auth/domain/errors/auth.error';
import { Result } from 'oxide.ts';

export interface UserGrpcPort {
  createUser(data: {
    email: string;
    name: string;
    password: string;
  }): Promise<Result<{ id: string }, AuthEmailAlreadyRegisteredError>>;
}
