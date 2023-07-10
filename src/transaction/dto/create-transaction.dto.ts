export class CreateTransactionDto {
  clientId: number;

  date: string;

  exchangeRate: number;

  baseAmount: number;

  baseCurrency: string;

  amount: number;

  commission: number;

  currency: 'EUR';
}
