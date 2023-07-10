import { Test, TestingModule } from '@nestjs/testing';
import { HighTurnoverRule } from './high-turnover-rule';
import { TransactionService } from '../../transaction/transaction.service';
import { mockDeep } from 'jest-mock-extended';

describe('HighTurnoverRule', () => {
  let highTurnoverRule: HighTurnoverRule;

  const transactionService = mockDeep<TransactionService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HighTurnoverRule,
        {
          provide: TransactionService,
          useValue: transactionService,
        },
      ],
    }).compile();

    highTurnoverRule = await module.resolve<HighTurnoverRule>(HighTurnoverRule);
  });

  describe('calculate()', () => {
    beforeEach(() => {
      transactionService.getMonthlyTransactions.mockResolvedValue(500);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('returns null if client monthly turnover is less than 1000', async () => {
      const commission = await highTurnoverRule.calculate({ client_id: 1, amount: 500, date: '2020-01-01' });

      expect(commission).toBeNull();
    });

    it('returns calculated commision price if it is higher than min commision', async () => {
      transactionService.getMonthlyTransactions.mockResolvedValue(1500);
      const commission = await highTurnoverRule.calculate({ client_id: 1, amount: 500, date: '2020-01-01' });

      expect(commission).toEqual(0.03);
    });
  });
});
