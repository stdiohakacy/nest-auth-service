import { BaseUniqueEntityId } from '@base/domain/identifier/base.unique-entity.id';

export class IdResponseDto {
  constructor(id: BaseUniqueEntityId) {
    this.id = id;
  }

  readonly id: BaseUniqueEntityId;
}
