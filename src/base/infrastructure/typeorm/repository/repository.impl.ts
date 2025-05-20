import { Repository } from 'typeorm';
import { BaseUniqueEntityId } from '../../../domain/identifier/base.unique-entity.id';
import { BASE_SCHEMA } from '../schema/base.schema';
import { BaseEntity as BaseInfrastructureEntity } from '../schema/base.entity';
import { BaseEntity as BaseDomainEntity } from '../../../domain/entities/base.entity';
import {
  Paginated,
  PaginatedQueryParams,
  RepositoryPort,
} from 'src/base/application/ports/repository.port';
import { MapperInterface } from '@base/domain/mappers/mapper.interface';
import { None, Option, Some } from 'oxide.ts';

export abstract class BaseRepositoryImpl<
  EDomain extends BaseDomainEntity<any>,
  EOrm extends BaseInfrastructureEntity,
> implements RepositoryPort<EDomain>
{
  constructor(
    private readonly repository: Repository<EOrm>,
    private readonly schema: { TABLE_NAME: string } & typeof BASE_SCHEMA,
    protected readonly mapper: MapperInterface<EDomain, EOrm>,
  ) {}

  async findOneById(id: BaseUniqueEntityId): Promise<Option<EDomain>> {
    try {
      const query = this.repository.createQueryBuilder(this.schema.TABLE_NAME);
      const entity = await query
        .where(`${this.schema.TABLE_NAME}.id = :id`, { id: id.toString() })
        .getOne();

      if (!entity) {
        return None;
      }

      return Some(this.mapper.toDomain(entity));
    } catch (error) {}
  }

  async findAll(): Promise<EDomain[]> {
    try {
      const query = await this.repository.createQueryBuilder(
        this.schema.TABLE_NAME,
      );
      const entities = query.getMany();

      return entities.then((entities) =>
        entities.map((entity) => this.mapper.toDomain(entity)),
      );
    } catch (error) {}
  }

  async findAllPaginated(
    params: PaginatedQueryParams,
  ): Promise<Paginated<EDomain>> {
    try {
      const query = this.repository.createQueryBuilder(this.schema.TABLE_NAME);
      const [entities, count] = await query
        .skip(params.offset)
        .take(params.limit)
        .orderBy(
          `${this.schema.TABLE_NAME}.${params.orderBy.field}`,
          params.orderBy.param,
        )
        .getManyAndCount();

      return Promise.resolve(
        new Paginated<EDomain>({
          count,
          limit: params.limit,
          page: params.page,
          data: entities.map((entity) => this.mapper.toDomain(entity)),
        }),
      );
    } catch (error) {}
  }

  async save(aggregate: EDomain): Promise<void> {
    try {
      const entity = this.mapper.toPersistence(aggregate);
      await this.repository.save(entity);
    } catch (error) {
      console.error(error);
    }
  }

  async saveMany(aggregates: EDomain[]): Promise<void> {
    try {
      const entities = aggregates.map((aggregate) =>
        this.mapper.toPersistence(aggregate),
      );

      await this.repository.save(entities);
    } catch (error) {
      console.error(error);
    }
  }

  async remove(id: BaseUniqueEntityId): Promise<void> {
    try {
      const query = this.repository.createQueryBuilder(this.schema.TABLE_NAME);
      const entity = await query
        .where(`${this.schema.TABLE_NAME}.id = :id`, { id: id.toString() })
        .getOne();

      await this.repository.remove(entity);
    } catch (error) {
      console.error(error);
    }
  }

  async removeMany(ids: BaseUniqueEntityId[]): Promise<void> {
    try {
      const query = this.repository.createQueryBuilder(this.schema.TABLE_NAME);
      const entities = await query
        .where(`${this.schema.TABLE_NAME}.id IN (:...ids)`, {
          ids: ids.map((id) => id.toString()),
        })
        .getMany();

      await this.repository.remove(entities);
    } catch (error) {
      console.error(error);
    }
  }

  async markAsDeleted(id: BaseUniqueEntityId): Promise<void> {
    try {
      const query = this.repository.createQueryBuilder(this.schema.TABLE_NAME);
      const entity = await query
        .where(`${this.schema.TABLE_NAME}.id = :id`, { id: id.toString() })
        .getOne();

      entity.deletedAt = new Date();
      await this.repository.save(entity);
    } catch (error) {
      console.error(error);
    }
  }

  async markManyAsDeleted(ids: BaseUniqueEntityId[]): Promise<void> {
    try {
      const query = this.repository.createQueryBuilder(this.schema.TABLE_NAME);
      const entities = await query
        .where(`${this.schema.TABLE_NAME}.id IN (:...ids)`, {
          ids: ids.map((id) => id.toString()),
        })
        .getMany();

      for (const entity of entities) {
        entity.deletedAt = new Date();
      }

      await this.repository.save(entities);
    } catch (error) {
      console.error(error);
    }
  }

  async unmarkAsDeleted(id: BaseUniqueEntityId): Promise<void> {
    try {
      const query = this.repository.createQueryBuilder(this.schema.TABLE_NAME);
      const entity = await query
        .where(`${this.schema.TABLE_NAME}.id = :id`, { id: id.toString() })
        .getOne();

      entity.deletedAt = null;
      await this.repository.save(entity);
    } catch (error) {
      console.error(error);
    }
  }

  async unmarkManyAsDeleted(ids: BaseUniqueEntityId[]): Promise<void> {
    try {
      const query = this.repository.createQueryBuilder(this.schema.TABLE_NAME);
      const entities = await query
        .where(`${this.schema.TABLE_NAME}.id IN (:...ids)`, {
          ids: ids.map((id) => id.toString()),
        })
        .getMany();

      for (const entity of entities) {
        entity.deletedAt = null;
      }

      await this.repository.save(entities);
    } catch (error) {
      console.error(error);
    }
  }

  async exists(id: BaseUniqueEntityId): Promise<boolean> {
    try {
      const query = this.repository.createQueryBuilder(this.schema.TABLE_NAME);
      const entity = await query
        .where(`${this.schema.TABLE_NAME}.id = :id`, { id: id.toString() })
        .getOne();

      return !!entity;
    } catch (error) {
      console.error(error);
    }
  }
}
