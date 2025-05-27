import { BaseEntity } from '@base/infrastructure/typeorm/schema/base.entity';
import { Column, Entity } from 'typeorm';
import { AUTH_USER_SCHEMA } from '../schemas/auth-user.schema';

@Entity(AUTH_USER_SCHEMA.TABLE_NAME)
export class AuthUserEntityOrm extends BaseEntity {
  @Column({
    name: AUTH_USER_SCHEMA.COLUMNS.USER_ID,
    type: 'uuid',
    unique: true,
    nullable: false,
  })
  userId: string;

  @Column({
    name: AUTH_USER_SCHEMA.COLUMNS.EMAIL,
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  email: string;

  @Column({
    name: AUTH_USER_SCHEMA.COLUMNS.HASHED_PASSWORD,
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  hashedPassword: string;

  @Column({
    name: AUTH_USER_SCHEMA.COLUMNS.REFRESH_TOKEN,
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  refreshToken: string;
}
