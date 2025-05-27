import { BASE_SCHEMA } from '@base/infrastructure/typeorm/schema/base.schema';

export const AUTH_USER_SCHEMA = {
  TABLE_NAME: 'auth_users',
  COLUMNS: {
    ...BASE_SCHEMA.COLUMNS,
    USER_ID: 'user_id',
    EMAIL: 'email',
    HASHED_PASSWORD: 'hashed_password',
    REFRESH_TOKEN: 'refresh_token',
  },
  RELATED_ONE: {},
  RELATED_MANY: {},
};
