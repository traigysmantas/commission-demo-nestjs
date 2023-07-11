import { IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
import { EnvironmentType, validate } from './validate';
import { registerAs } from '@nestjs/config';
import { DEFAULT_RULES_CONFIG } from './constants';

class RulesConfiguration {
  @IsNotEmpty()
  @IsEnum(EnvironmentType)
  NODE_ENV: EnvironmentType;

  @IsNumber()
  DEFAULT_RULE_MINIMUM_COMMISSION_IN_EUR: number;

  @IsNumber()
  DEFAULT_RULE_COMMISSION_RATE: number;
}

export default registerAs(DEFAULT_RULES_CONFIG, () => {
  // TODO: fix types
  const config = validate<RulesConfiguration>(process.env, RulesConfiguration);

  return config;
});
