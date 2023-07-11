import { registerAs } from '@nestjs/config';
import { Transaction } from '../transaction/transaction.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Transform } from 'class-transformer';
import { IsNumber, IsString, IsBoolean } from 'class-validator';
import { isBooleanString, validate } from './validate';
import { DATABASE_CONFIG } from './constants';
import { ClientDiscount } from '../commission-calculation/client-discount.entity';
import { CreateTables1689142284682 } from './migrations/1689142284682-CreateTables';

class DatabaseConfiguration {
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

export default registerAs(DATABASE_CONFIG, () => {
  const config = validate<DatabaseConfiguration>(process.env, DatabaseConfiguration);

  return {
    type: 'postgres',
    host: config.DATABASE_HOST,
    port: config.DATABASE_PORT,
    username: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE_NAME,
    entities: [Transaction, ClientDiscount],
    namingStrategy: new SnakeNamingStrategy(),
    migrationsRun: config.DATABASE_MIGRATION_RUN,
    // TODO: Investigate how to add multiple migrations.
    migrations: [CreateTables1689142284682],
    synchronize: config.DATABASE_SYNCHRONIZE,
    dropSchema: config.DATABASE_DROP_SCHEMA,
  };
});
