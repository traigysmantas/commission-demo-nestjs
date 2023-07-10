import { Test, TestingModule } from '@nestjs/testing';
import { TransactionCommissionService } from './transaction-commission.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { TransactionService } from '../transaction/transaction.service';
import { ExchangeRateService } from '../exchange-rate/exchange-rate.service';
import { CommissionCalculationService } from '../commission-calculation/commission-calculation.service';

describe('TransactionCommissionService', () => {
  let transactionCommissionService: TransactionCommissionService;

  let transactionService: DeepMockProxy<TransactionService>;
  let exchangeRateService: DeepMockProxy<ExchangeRateService>;
  let commissionService: DeepMockProxy<CommissionCalculationService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionCommissionService],
    })
      .useMocker(() => mockDeep())
      .compile();

    transactionCommissionService =
      module.get<DeepMockProxy<TransactionCommissionService>>(TransactionCommissionService);
    transactionService = module.get<DeepMockProxy<TransactionService>>(TransactionService);
    exchangeRateService = module.get<DeepMockProxy<ExchangeRateService>>(ExchangeRateService);
    commissionService = module.get<DeepMockProxy<CommissionCalculationService>>(CommissionCalculationService);
  });

  describe('calculateCommission', () => {
    const MOCK_DATA = {
      amount: 100,
      client_id: 1,
      currency: 'EUR',
      date: '2023-01-01',
    };

    beforeEach(() => {
      exchangeRateService.convertCurrency.mockResolvedValue({ amount: 100, currency: 'EUR', exchangeRate: 1 });
      commissionService.calculateCommission.mockResolvedValue(0.5);
    });

    it('calls exchangeRateService.convertCurrency', async () => {
      await transactionCommissionService.calculateCommission(MOCK_DATA);

      expect(exchangeRateService.convertCurrency).toHaveBeenCalledWith({
        baseAmount: 100,
        baseCurrency: 'EUR',
        date: '2023-01-01',
      });
    });

    it('calls commissionService.calculateCommission with converted currency amount', async () => {
      await transactionCommissionService.calculateCommission(MOCK_DATA);

      expect(exchangeRateService.convertCurrency).toHaveBeenCalledWith({
        baseAmount: 100,
        baseCurrency: 'EUR',
        date: '2023-01-01',
      });
    });

    it('calls transactionService.save with transaction data', async () => {
      await transactionCommissionService.calculateCommission(MOCK_DATA);

      expect(transactionService.create).toHaveBeenCalledWith({
        amount: 100,
        baseAmount: 100,
        baseCurrency: 'EUR',
        clientId: 1,
        commission: 0.5,
        currency: 'EUR',
        date: '2023-01-01',
        exchangeRate: 1,
      });
    });
  });
});
