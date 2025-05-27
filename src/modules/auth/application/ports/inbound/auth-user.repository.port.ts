import { RepositoryPort } from '@base/application/ports/repository.port';
import { AuthUserEntity } from '@module/auth/domain/aggregates/auth-user.aggregate';

export interface AuthUserRepositoryPort
  extends RepositoryPort<AuthUserEntity> {}
