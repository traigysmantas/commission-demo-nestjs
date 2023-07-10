import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);

  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  async create(transactionDto: CreateTransactionDto) {
    const transaction = this.transactionsRepository.create(transactionDto);

    return this.transactionsRepository.save(transaction);
  }

  async getMonthlyTransactions(client_id: number, dateString: string) {
    // Assumption that we are saving/querying 'historical' transactions too.
    const date = new Date(dateString);
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;

    const query = this.transactionsRepository
      .createQueryBuilder()
      .select('SUM(amount)', 'transactionSum')
      .where('client_id = :client_id', { client_id })
      .andWhere('EXTRACT(YEAR FROM date) = :year', { year: currentYear })
      .andWhere('EXTRACT(MONTH FROM date) = :month', { month: currentMonth });

    this.logger.debug('getMonthlyTransactions SQL query: ', query.getSql());

    const result = await query.getRawOne();

    return result?.transactionSum || 0;
  }
}
