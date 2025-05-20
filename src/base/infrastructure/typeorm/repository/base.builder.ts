export abstract class BaseBuilder<TDomain, TPersistence> {
  protected _domain: TDomain;
  protected _persistence: TPersistence;

  constructor() {
    this._domain = {} as TDomain;
    this._persistence = {} as TPersistence;
  }

  public abstract build(): TDomain | TPersistence;

  public fromDomain(domain: TDomain): this {
    this._domain = domain;
    return this;
  }

  public fromPersistence(persistence: TPersistence): this {
    this._persistence = persistence;
    return this;
  }
}
