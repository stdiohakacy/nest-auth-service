import { Option } from 'oxide.ts';
import { BaseUniqueEntityId } from '../../domain/identifier/base.unique-entity.id';

/*  Most of repositories will probably need generic 
    save/find/delete operations, so it's easier
    to have some shared interfaces.
    More specific queries should be defined
    in a respective repository.
*/

export class Paginated<T> {
  readonly count: number;
  readonly limit: number;
  readonly page: number;
  readonly data: readonly T[];

  constructor(props: Paginated<T>) {
    this.count = props.count;
    this.limit = props.limit;
    this.page = props.page;
    this.data = props.data;
  }
}

export type OrderBy = { field: string | true; param: 'ASC' | 'DESC' };

export type PaginatedQueryParams = {
  limit: number;
  page: number;
  offset: number;
  orderBy: OrderBy;
};

/**
 * Generic repository interface for entities
 * T extends AggregateRoot to ensure repositories only work with entities
 */
export interface RepositoryPort<TEntity> {
  findOneById(id: BaseUniqueEntityId): Promise<Option<TEntity>>;

  findAll(): Promise<TEntity[]>;

  findAllPaginated(params: PaginatedQueryParams): Promise<Paginated<TEntity>>;
  /**
   * Save an entity (create or update)
   */
  save(entity: TEntity): Promise<void>;

  /**
   * Save multiple entities in a single transaction
   */
  saveMany(entities: TEntity[]): Promise<void>;

  /**
   * Remove an entity permanently
   */
  remove(id: BaseUniqueEntityId): Promise<void>;

  /**
   * Remove multiple entities permanently
   */
  removeMany(ids: BaseUniqueEntityId[]): Promise<void>;

  /**
   * Mark an entity as deleted without removing it
   * This is a domain concept rather than infrastructure "soft delete"
   */
  markAsDeleted(id: BaseUniqueEntityId): Promise<void>;

  /**
   * Mark multiple entities as deleted
   */
  markManyAsDeleted(ids: BaseUniqueEntityId[]): Promise<void>;

  /**
   * Restore a deleted entity
   */
  unmarkAsDeleted(id: BaseUniqueEntityId): Promise<void>;

  /**
   * Restore multiple deleted entities
   */
  unmarkManyAsDeleted(ids: BaseUniqueEntityId[]): Promise<void>;

  /**
   * Check if an entity exists by ID
   */
  exists(id: BaseUniqueEntityId): Promise<boolean>;
}
