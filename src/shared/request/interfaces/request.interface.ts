import { Request } from 'express';

export interface RequestAppInterface<T> extends Request {
  user?: T;
}
