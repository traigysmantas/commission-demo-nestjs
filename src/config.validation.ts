import { Transform, TransformFnParams, plainToClass } from 'class-transformer';
import { IsEnum, IsNumber, validateSync, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

enum EnvironmentType {
  Dev = 'development',
  Test = 'test',
  Prod = 'prod',
}

const isBooleanString = ({ obj, key }: TransformFnParams) => {
  return [true, 'enabled', 'true'].includes(obj[key]);
};

class Configuration {
  @IsNotEmpty()
  @IsEnum(EnvironmentType)
  NODE_ENV: EnvironmentType;

  @IsNumber()
  DEFAULT_RULE_MINIMUM_COMMISSION_IN_EUR: number;

  @IsNumber()
  DEFAULT_RULE_COMMISSION_RATE: number;

  @IsString()
  DATABASE_HOST: string;

  @IsNumber()
  DATABASE_PORT: number;

  @IsString()
  DATABASE_USER: string;

  @IsString()
  DATABASE_PASSWORD: string;

  @IsString()
  DATABASE_NAME: string;

  @IsBoolean()
  @Transform(isBooleanString)
  DATABASE_MIGRATION_RUN: boolean;

  @IsBoolean()
  @Transform(isBooleanString)
  DATABASE_SYNCHRONIZE: boolean;

  @IsBoolean()
  @Transform(isBooleanString)
  DATABASE_DROP_SCHEMA: boolean;
}

export function validate(params: Record<string, unknown>) {
  const config = plainToClass(Configuration, params, { enableImplicitConversion: true });

  const errors = validateSync(config, { whitelist: true });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return config;
}
