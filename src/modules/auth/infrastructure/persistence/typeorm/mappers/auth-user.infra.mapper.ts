import { MapperInterface } from '@base/domain/mappers/mapper.interface';
import { AuthUserEntity } from '@module/auth/domain/aggregates/auth-user.aggregate';
import { Injectable } from '@nestjs/common';
import { AuthUserEntityOrm } from '../entities/auth-user.entity-orm';
import { BaseUniqueEntityId } from '@base/domain/identifier/base.unique-entity.id';

/**
 * Mapper constructs objects that are used in different layers:
 * Record is an object that is stored in a database,
 * Entity is an object that is used in application domain layer,
 * and a ResponseDTO is an object returned to a user (usually as json).
 */
@Injectable()
export class AuthUserInfraMapper
  implements MapperInterface<AuthUserEntity, AuthUserEntityOrm>
{
  toPersistence(entity: AuthUserEntity): AuthUserEntityOrm {
    const props = entity.getProps();

    const authOrm = new AuthUserEntityOrm();

    authOrm.id = entity.id.toString();
    authOrm.email = props.email;
    authOrm.hashedPassword = props.hashedPassword;
    authOrm.userId = props.userId;
    authOrm.updatedAt = props.updatedAt;
    authOrm.deletedAt = props.deletedAt;

    return authOrm;
  }

  toDomain(ormEntity: AuthUserEntityOrm): AuthUserEntity {
    const entity = new AuthUserEntity({
      id: new BaseUniqueEntityId(ormEntity.id),
      createdAt: ormEntity.createdAt,
      updatedAt: ormEntity.updatedAt,
      deletedAt: ormEntity.deletedAt,
      props: {
        email: ormEntity.email,
        hashedPassword: ormEntity.hashedPassword,
        userId: ormEntity.userId,
        refreshToken: ormEntity.refreshToken,
      },
    });

    return entity;
  }

  /* ^ Data returned to the user is whitelisted to avoid leaks.
     If a new property is added, like password or a
     credit card number, it won't be returned
     unless you specifically allow this.
     (avoid blacklisting, which will return everything
      but blacklisted items, which can lead to a data leak).
  */
}
