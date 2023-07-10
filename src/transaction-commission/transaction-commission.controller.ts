import { Body, Controller, Post } from '@nestjs/common';
import { TransactionCommissionService } from './transaction-commission.service';
import { CreateTransactionCommissionDto } from './dto/create-transaction-commission.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { TransactionDto } from '../transaction/dto/transaction.dto';

@Controller('transaction-commission')
export class TransactionCommissionController {
  constructor(private transactionCommissionService: TransactionCommissionService) {}

  @Post()
  @Serialize(TransactionDto)
  calculateCommission(@Body() createTransactionCommission: CreateTransactionCommissionDto) {
    return this.transactionCommissionService.calculateCommission(createTransactionCommission);
  }
}
