import { BaseIdentifier } from './base.identifier';

export class BaseUniqueEntityId extends BaseIdentifier<string | number> {
  constructor(id: string | number) {
    super(id);
  }
}
