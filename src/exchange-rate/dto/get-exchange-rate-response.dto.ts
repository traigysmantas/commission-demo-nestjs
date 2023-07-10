export class GetExchangeRateResponse {
  success: boolean;

  historical: boolean;

  base: string;

  date: string;

  result: number;

  rates: {
    [key: string]: number;
  };
}
