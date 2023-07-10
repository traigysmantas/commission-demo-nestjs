import { Transform } from 'class-transformer';
import currency from 'currency.js';
import { IsDateString, IsISO4217CurrencyCode, IsNumber, IsPositive, Min } from 'class-validator';
import { IsBefore } from '../validators/isBefore.validator';

export class CreateTransactionCommissionDto {
  @IsBefore(new Date(), { message: 'Dates in future are not allowed' })
  @IsDateString()
  date: string;

  @IsPositive()
  @Min(0.01)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Transform(({ value: stringValue }) => currency(parseFloat(stringValue)).value)
  amount: number;

  @IsISO4217CurrencyCode()
  currency: string;

  @IsNumber()
  client_id: number;
}
