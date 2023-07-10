import { Test, TestingModule } from '@nestjs/testing';
import { CommissionCalculationService } from './commission-calculation.service';
import { TransactionService } from '../transaction/transaction.service';
import { mockDeep } from 'jest-mock-extended';
import { ConfigService } from '@nestjs/config';

describe('CommissionService', () => {
  let commissionCalculationService: CommissionCalculationService;

  const transactionService = mockDeep<TransactionService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommissionCalculationService,
        {
          provide: TransactionService,
          useValue: transactionService,
        },
        {
          provide: ConfigService,
          // TODO: possible improvement.
          useValue: {
            get: jest.fn().mockImplementation((key: string) => {
              if (key === 'DEFAULT_RULE_MINIMUM_COMMISSION_IN_EUR') return 0.05;
              if (key === 'DEFAULT_RULE_COMMISSION_RATE') return 0.005;
            }),
          },
        },
      ],
    }).compile();

    commissionCalculationService = module.get<CommissionCalculationService>(CommissionCalculationService);
  });

  describe('calculateCommission()', () => {
    beforeEach(() => {
      transactionService.getMonthlyTransactions.mockResolvedValue(500);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('calculates commission using default rule for new clientId without discount', async () => {
      const commission = await commissionCalculationService.calculateCommission({
        amount: 1000,
        client_id: 1,
        date: '2020-01-01',
      });

      expect(commission).toEqual(5);
    });

    it('calculates commission using clientDiscountRule for clientId with discount', async () => {
      const commission = await commissionCalculationService.calculateCommission({
        amount: 1000,
        client_id: 42,
        date: '2020-01-01',
      });

      expect(commission).toEqual(0.05);
    });

    it('calculates commission using highTurnover rule for clientId with discount', async () => {
      transactionService.getMonthlyTransactions.mockResolvedValue(3500);

      const commission = await commissionCalculationService.calculateCommission({
        amount: 1000,
        client_id: 42,
        date: '2020-01-01',
      });

      expect(commission).toEqual(0.03);
    });
  });
});
