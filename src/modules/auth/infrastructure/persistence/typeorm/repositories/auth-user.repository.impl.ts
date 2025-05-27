import { BaseRepositoryImpl } from '@base/infrastructure/typeorm/repository/repository.impl';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthUserEntityOrm } from '../entities/auth-user.entity-orm';
import { AuthUserEntity } from '@module/auth/domain/aggregates/auth-user.aggregate';
import { AuthUserRepositoryPort } from '@module/auth/application/ports/inbound/auth-user.repository.port';
import { AUTH_USER_SCHEMA } from '../schemas/auth-user.schema';
import { AuthUserInfraMapper } from '../mappers/auth-user.infra.mapper';

@Injectable()
export class AuthUserRepositoryImpl
  extends BaseRepositoryImpl<AuthUserEntity, AuthUserEntityOrm>
  implements AuthUserRepositoryPort
{
  constructor(
    @InjectRepository(AuthUserEntityOrm)
    readonly authUserRepository: Repository<AuthUserEntityOrm>,
  ) {
    super(authUserRepository, AUTH_USER_SCHEMA, new AuthUserInfraMapper());
  }
}
