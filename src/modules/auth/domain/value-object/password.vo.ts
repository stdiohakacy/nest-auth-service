import { Guard } from '@base/domain/patterns/guard.pattern';
import { BaseValueObject } from '@base/domain/value-objects/base.vo';
import {
  ArgumentNotProvidedException,
  ArgumentOutOfRangeException,
} from '@base/exceptions';
import bcrypt from 'bcrypt';

interface PasswordProps {
  hashed: string;
}

export class PasswordVO extends BaseValueObject<PasswordProps> {
  private static readonly MIN_LENGTH = 6;
  private static readonly MAX_LENGTH = 100;

  private constructor(props: PasswordProps) {
    super(props);
  }

  get value() {
    return this.props.hashed;
  }

  /**
   * Validate password format (hashed must be string and not empty)
   */
  protected validate(props: PasswordProps): void {
    if (Guard.isEmpty(props.hashed)) {
      throw new ArgumentNotProvidedException('Password hash was not provided');
    }

    if (!Guard.lengthIsBetween(props.hashed, 20, 200)) {
      throw new ArgumentOutOfRangeException(
        'Password hash is invalid or too short',
      );
    }
  }

  /**
   * Create Password Value Object from raw text (plaintext password)
   * @param raw - plaintext password
   */
  public static async createFromRaw(raw: string): Promise<PasswordVO> {
    if (Guard.isEmpty(raw)) {
      throw new ArgumentNotProvidedException('Raw password was not provided');
    }

    if (!Guard.lengthIsBetween(raw, this.MIN_LENGTH, this.MAX_LENGTH)) {
      throw new ArgumentOutOfRangeException(
        `Password length must be between ${this.MIN_LENGTH} and ${this.MAX_LENGTH}`,
      );
    }

    const hashed = await bcrypt.hash(raw, 10);
    return new PasswordVO({ hashed });
  }

  /**
   * Create Password Value Object from a hashed password (e.g. from database)
   * @param hashed - hashed password
   */
  public static createFromHashed(hashed: string): PasswordVO {
    return new PasswordVO({ hashed });
  }

  /**
   * Compare this password (hashed) with a raw password
   * @param raw - plaintext password
   */
  public async compare(raw: string): Promise<boolean> {
    return bcrypt.compare(raw, this.props.hashed);
  }
}
