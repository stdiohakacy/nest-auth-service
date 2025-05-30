import { Request } from 'express';

export interface RequestAppInterface<T = any> extends Request {
  user?: T;
}
