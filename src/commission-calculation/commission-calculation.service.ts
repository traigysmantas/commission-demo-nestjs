import { Injectable, Logger } from '@nestjs/common';
import { ClientDiscountRule } from './rules/client-discount-rule';
import { DefaultRule } from './rules/default-rule';
import { HighTurnoverRule } from './rules/high-turnover-rule';
import { CalculateCommissionDto } from './dto/calculate-commission.dto';
import { CommissionRule } from './interfaces/commision-rule.interface';
import { TransactionService } from '../transaction/transaction.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CommissionCalculationService {
  private readonly logger = new Logger(CommissionCalculationService.name);

  private readonly rules: CommissionRule[];

  constructor(transactionService: TransactionService, configService: ConfigService) {
    this.rules = [new ClientDiscountRule(), new DefaultRule(configService), new HighTurnoverRule(transactionService)];
  }

  async calculateCommission(transactionData: CalculateCommissionDto): Promise<number> {
    const commisions = await Promise.all(
      this.rules.map(async (rule) => {
        const commission = await rule.calculate(transactionData);
        return { rule, commission };
      }),
    );

    return this.getLowestCommission(commisions);
  }

  private getLowestCommission(commissionsWithRules: { rule: CommissionRule; commission: number }[]): number {
    this.logger.debug(
      'Commissions',
      commissionsWithRules.map(({ rule, commission }) => ({ ruleName: rule.ruleName, commission })),
    );

    const lowestCommission = commissionsWithRules
      .filter((commissionWithRule) => !!commissionWithRule.commission)
      .reduce((lowest, ruleWithCommission) =>
        ruleWithCommission.commission < lowest.commission ? ruleWithCommission : lowest,
      );

    this.logger.log('Lowest Commission:', {
      ruleName: lowestCommission.rule.ruleName,
      commission: lowestCommission.commission,
    });

    return lowestCommission.commission;
  }
}
