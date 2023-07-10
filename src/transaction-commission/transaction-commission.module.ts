import { Module } from '@nestjs/common';
import { TransactionCommissionController } from './transaction-commission.controller';
import { CommissionModule } from '../commission-calculation/commission-calculation.module';
import { TransactionModule } from '../transaction/transaction.module';
import { ExchangeRateModule } from '../exchange-rate/exchange-rate.module';
import { TransactionCommissionService } from './transaction-commission.service';

@Module({
  imports: [CommissionModule, TransactionModule, ExchangeRateModule],
  providers: [TransactionCommissionService],
  controllers: [TransactionCommissionController],
  exports: [TransactionCommissionService],
})
export class TransactionCommissionModule {}
