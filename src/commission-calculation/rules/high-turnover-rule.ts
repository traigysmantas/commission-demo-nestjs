import { Injectable } from '@nestjs/common';
import { TransactionService } from '../../transaction/transaction.service';
import { CalculateCommissionDto } from '../dto/calculate-commission.dto';
import { CommissionRule } from '../interfaces/commision-rule.interface';

@Injectable()
export class HighTurnoverRule implements CommissionRule {
  ruleName = HighTurnoverRule.name;
  private readonly discountTransactionTurnover = 1000; // euros
  private readonly turnoverDiscount = 0.03; // euros

  constructor(private transactionService: TransactionService) {}

  async isRuleValid(client_id: number, date: string) {
    const transactionSum = await this.transactionService.getMonthlyTransactions(client_id, date);

    return transactionSum > this.discountTransactionTurnover;
  }

  async calculate({ client_id, date }: CalculateCommissionDto) {
    const isRuleApplicable = await this.isRuleValid(client_id, date);

    if (!isRuleApplicable) return null;

    return this.turnoverDiscount;
  }
}
