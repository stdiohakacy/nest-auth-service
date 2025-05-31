import { ExceptionBase } from '@base/exceptions';
import { ERROR_CODES } from '@base/exceptions/error.codes';

export class AuthAccountAlreadyRegistered extends ExceptionBase {
  static readonly message: string = 'Email already registered';
  readonly code = ERROR_CODES.AUTH.EMAIL_ALREADY_REGISTERED;

  constructor(cause?: Error, metadata?: unknown) {
    super(AuthAccountAlreadyRegistered.message, cause, metadata);
  }
}
