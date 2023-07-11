import { Module } from '@nestjs/common';
import { CommissionCalculationService } from './commission-calculation.service';
import { TransactionModule } from '../transaction/transaction.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientDiscount } from './client-discount.entity';

@Module({
  imports: [TransactionModule, TypeOrmModule.forFeature([ClientDiscount])],
  providers: [CommissionCalculationService],
  exports: [CommissionCalculationService],
})
export class CommissionModule {}
