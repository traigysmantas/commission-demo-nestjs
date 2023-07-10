import currency from 'currency.js';
import { CreateTransactionDto } from '../src/transaction/dto/create-transaction.dto';

export const buildTransaction = (transactionDto: Partial<CreateTransactionDto>): CreateTransactionDto => {
  const baseAmount = currency(transactionDto.baseAmount).value || 500;
  const exchangeRate = transactionDto.exchangeRate || 1;
  return {
    clientId: 1,
    exchangeRate,
    baseAmount,
    baseCurrency: 'EUR',
    amount: currency(baseAmount * exchangeRate).value,
    commission: 2.5,
    currency: 'EUR',
    date: '2021-01-02',
    ...transactionDto,
  };
};
