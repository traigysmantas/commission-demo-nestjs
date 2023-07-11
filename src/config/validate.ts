import { ClassConstructor, TransformFnParams, plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

export enum EnvironmentType {
  Dev = 'development',
  Test = 'test',
  Prod = 'prod',
}

export const isBooleanString = ({ obj, key }: TransformFnParams) => {
  return [true, 'enabled', 'true'].includes(obj[key]);
};

export function validate<T>(params: Record<string, unknown>, configValidator: ClassConstructor<any>) {
  const config = plainToClass(configValidator, params, { enableImplicitConversion: true });

  const errors = validateSync(config, { whitelist: true });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return config as T;
}
