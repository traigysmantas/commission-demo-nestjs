import { Module } from '@nestjs/common';
import { CommissionCalculationService } from './commission-calculation.service';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [TransactionModule],
  providers: [CommissionCalculationService],
  exports: [CommissionCalculationService],
})
export class CommissionModule {}
