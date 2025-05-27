import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import {
  ENUM_APP_ENVIRONMENT,
  ENUM_APP_TIMEZONE,
} from 'src/app/enums/app.enum';

export class AppEnvDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  APP_NAME: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @IsEnum(ENUM_APP_ENVIRONMENT)
  APP_ENV: ENUM_APP_ENVIRONMENT;

  @IsString()
  @IsNotEmpty()
  @IsEnum(ENUM_APP_TIMEZONE)
  APP_TIMEZONE: ENUM_APP_TIMEZONE;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  GRPC_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  GRPC_PORT: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  HTTP_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  HTTP_PORT: number;

  @IsBoolean()
  @IsNotEmpty()
  @Type(() => Boolean)
  URL_VERSIONING_ENABLE: boolean;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  URL_VERSION: number;
}
