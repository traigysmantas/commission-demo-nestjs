import { Expose, Transform } from 'class-transformer';

export class TransactionDto {
  @Expose({ name: 'commission' })
  @Transform(({ value }) => Number(value).toFixed(2))
  amount: string;

  @Expose()
  currency: 'EUR';
}
