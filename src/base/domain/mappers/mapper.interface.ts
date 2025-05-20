import { BaseEntity as BaseDomainEntity } from '../entities/base.entity';

export interface MapperInterface<
  DomainEntity extends BaseDomainEntity<unknown>,
  OrmEntity,
> {
  toPersistence(entity: DomainEntity): OrmEntity;
  toDomain(ormEntity: OrmEntity): DomainEntity;
}
