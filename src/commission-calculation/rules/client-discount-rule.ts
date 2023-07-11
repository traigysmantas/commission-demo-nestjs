import { Injectable } from '@nestjs/common';
import { CalculateCommissionDto } from '../dto/calculate-commission.dto';
import { CommissionRule } from '../interfaces/commision-rule.interface';
import { ClientDiscount } from '../client-discount.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientDiscountRule implements CommissionRule {
  ruleName = ClientDiscountRule.name;

  constructor(
    @InjectRepository(ClientDiscount)
    private clientDiscountRepository: Repository<ClientDiscount>,
  ) {}

  async calculate({ client_id }: CalculateCommissionDto): Promise<number | null> {
    const clientDiscount = await this.getClientDiscount(client_id);

    if (!clientDiscount) return null;

    return clientDiscount.discount;
  }

  private async getClientDiscount(clientId: number) {
    return this.clientDiscountRepository.findOne({ where: { clientId } });
  }
}
