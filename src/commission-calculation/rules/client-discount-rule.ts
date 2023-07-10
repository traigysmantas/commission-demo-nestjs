import { Injectable } from '@nestjs/common';
import { CalculateCommissionDto } from '../dto/calculate-commission.dto';
import { CommissionRule } from '../interfaces/commision-rule.interface';

@Injectable()
export class ClientDiscountRule implements CommissionRule {
  ruleName = ClientDiscountRule.name;
  private readonly clientDiscounts: { [clientId: number]: number } = {
    42: 0.05, // 0.05 euro.
  };

  constructor() {}

  calculate({ amount, client_id }: CalculateCommissionDto) {
    const clientDiscount = this.getClientDiscount(client_id);

    if (!clientDiscount) return null;

    return clientDiscount;
  }

  private getClientDiscount(client_id: number): number {
    return this.clientDiscounts[client_id];
  }
}
