import { ResponseMetadataInterface } from '@shared/response/interfaces/response.interface';
import { ValidationError } from 'class-validator';

export interface AppExceptionInterface {
  statusCode: number;
  message: string;
  errors?: ValidationError[];
  data?: Record<string, unknown>;
  _metadata?: ResponseMetadataInterface;
}
