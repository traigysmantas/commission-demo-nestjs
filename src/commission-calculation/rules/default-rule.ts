import currency from 'currency.js';
import { CommissionRule } from '../interfaces/commision-rule.interface';
import { CalculateCommissionDto } from '../dto/calculate-commission.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DefaultRule implements CommissionRule {
  ruleName = DefaultRule.name;
  private readonly defaultCommisionRate = this.configService.get<number>('DEFAULT_RULE_COMMISSION_RATE');
  private readonly minCommission = this.configService.get<number>('DEFAULT_RULE_MINIMUM_COMMISSION_IN_EUR');

  constructor(private configService: ConfigService) {}

  calculate({ amount }: CalculateCommissionDto): number {
    const commission = amount * this.defaultCommisionRate;

    return commission > this.minCommission ? currency(commission).value : this.minCommission;
  }
}
