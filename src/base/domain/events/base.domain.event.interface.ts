import { BaseUniqueEntityId } from '../identifier/base.unique-entity.id';

export interface BaseDomainEventInterface {
  dateTimeOccurred: Date;
  getAggregateRootId(): BaseUniqueEntityId;
  toJSON(): Record<string, unknown>;
}
