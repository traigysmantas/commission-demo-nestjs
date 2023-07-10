import { CalculateCommissionDto } from '../dto/calculate-commission.dto';

export interface CommissionRule {
  ruleName: string;
  calculate(transactionData: CalculateCommissionDto): number | null | Promise<number | null>;
}
