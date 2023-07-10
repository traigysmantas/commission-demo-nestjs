import { PickType } from '@nestjs/mapped-types';
import { CreateTransactionCommissionDto } from '../../transaction-commission/dto/create-transaction-commission.dto';

export class GetExchangeRateDto extends PickType(CreateTransactionCommissionDto, ['date']) {
  baseAmount: number;
  baseCurrency: string;
}
