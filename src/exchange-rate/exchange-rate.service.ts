import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { GetExchangeRateResponse } from './dto/get-exchange-rate-response.dto';
import { GetExchangeRateDto } from './dto/get-exchange-rate.dto';
import currency from 'currency.js';

@Injectable()
export class ExchangeRateService {
  private readonly logger = new Logger(ExchangeRateService.name);

  constructor(private readonly httpService: HttpService) {}

  async convertCurrency({ date, baseAmount, baseCurrency }: GetExchangeRateDto): Promise<{
    amount: number;
    exchangeRate: number;
    currency: 'EUR';
  }> {
    if (baseCurrency === 'EUR') {
      return { amount: baseAmount, currency: 'EUR', exchangeRate: 1 };
    }

    const { data } = await firstValueFrom(
      this.httpService
        .get<GetExchangeRateResponse>(`https://api.exchangerate.host/${date}`, {
          params: {
            base: baseCurrency,
          },
        })
        .pipe(
          catchError((err: AxiosError) => {
            this.logger.error(err, 'getExchangeRate error');
            throw err;
          }),
        ),
    );

    const rate = data.rates['EUR'];

    if (!rate) {
      throw new Error(`Exchange rate not found for ${baseCurrency}`);
    }

    return {
      amount: currency(baseAmount * rate).value,
      exchangeRate: rate,
      currency: 'EUR',
    };
  }
}
