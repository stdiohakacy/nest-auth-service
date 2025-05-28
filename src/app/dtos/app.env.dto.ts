import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';
import {
  ENUM_AUTH_SRV_APP_ENVIRONMENT,
  ENUM_AUTH_SRV_APP_TIMEZONE,
} from 'src/app/enums/app.enum';

export class AppEnvDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  AUTH_SRV_APP_NAME: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @IsEnum(ENUM_AUTH_SRV_APP_ENVIRONMENT)
  AUTH_SRV_APP_ENV: ENUM_AUTH_SRV_APP_ENVIRONMENT;

  @IsString()
  @IsNotEmpty()
  @IsEnum(ENUM_AUTH_SRV_APP_TIMEZONE)
  AUTH_SRV_APP_TIMEZONE: ENUM_AUTH_SRV_APP_TIMEZONE;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  AUTH_SRV_GRPC_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  AUTH_SRV_GRPC_PORT: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  AUTH_SRV_HTTP_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  AUTH_SRV_HTTP_PORT: number;

  @IsBoolean()
  @IsNotEmpty()
  @Type(() => Boolean)
  AUTH_SRV_URL_VERSIONING_ENABLE: boolean;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  AUTH_SRV_URL_VERSION: number;

  @IsString()
  @IsNotEmpty()
  USER_SRV_GRPC_URL: string;
}
