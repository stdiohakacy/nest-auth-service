import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BASE_SCHEMA } from './base.schema';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: BASE_SCHEMA.COLUMNS.ID })
  id: string;

  @CreateDateColumn({
    name: BASE_SCHEMA.COLUMNS.CREATED_AT,
    type: 'timestamptz',
    nullable: true,
  })
  createdAt?: Date;

  @UpdateDateColumn({
    name: BASE_SCHEMA.COLUMNS.UPDATED_AT,
    type: 'timestamptz',
    nullable: true,
  })
  updatedAt?: Date;

  @DeleteDateColumn({
    name: BASE_SCHEMA.COLUMNS.DELETED_AT,
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt?: Date;
}
