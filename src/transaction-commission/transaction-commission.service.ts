import { Injectable } from '@nestjs/common';
import { TransactionService } from '../transaction/transaction.service';
import { CreateTransactionCommissionDto } from './dto/create-transaction-commission.dto';
import { CommissionCalculationService } from '../commission-calculation/commission-calculation.service';
import { ExchangeRateService } from '../exchange-rate/exchange-rate.service';

@Injectable()
export class TransactionCommissionService {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly exchangeRateService: ExchangeRateService,
    private readonly commissionService: CommissionCalculationService,
  ) {}

  async calculateCommission(data: CreateTransactionCommissionDto) {
    const { date, amount: baseAmount, currency: baseCurrency, client_id } = data;

    const convertedData = await this.exchangeRateService.convertCurrency({
      baseAmount,
      baseCurrency,
      date,
    });

    const commission = await this.commissionService.calculateCommission({
      amount: convertedData.amount,
      client_id,
      date,
    });

    return this.transactionService.create({
      baseAmount,
      baseCurrency,
      date,
      clientId: client_id,
      commission,
      ...convertedData,
    });
  }
}
