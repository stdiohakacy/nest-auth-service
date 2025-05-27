import { BaseAggregateRoot } from '@base/domain/aggregates/base.aggregate';
import { BaseUniqueEntityId } from '@base/domain/identifier/base.unique-entity.id';

export interface AuthUserProps {
  userId: string;
  email: string;
  hashedPassword: string;
  refreshToken: string;
}

export class AuthUserEntity extends BaseAggregateRoot<AuthUserProps> {
  protected readonly _id: BaseUniqueEntityId;

  public validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
