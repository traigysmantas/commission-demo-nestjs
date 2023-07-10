import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { mockDeep } from 'jest-mock-extended';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';

describe('TransactionService', () => {
  let transactionService: TransactionService;

  const transactionRepository = mockDeep<Repository<Transaction>>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: getRepositoryToken(Transaction),
          useValue: transactionRepository,
        },
      ],
    }).compile();

    transactionService = module.get<TransactionService>(TransactionService);
  });

  describe('create()', () => {
    const MOCK_TRANSACTION: Transaction = {
      transactionId: 'uuid',
      amount: 100,
      baseAmount: 100,
      baseCurrency: 'EUR',
      clientId: 1,
      commission: 0.5,
      currency: 'EUR',
      date: new Date('2023-01-01'),
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-01'),
      exchangeRate: 1,
    };

    const { transactionId, createdAt, updatedAt, ...data } = MOCK_TRANSACTION;

    const MOCK_DATA: CreateTransactionDto = { ...data, date: '2023-01-01', currency: 'EUR' };

    beforeEach(() => {
      transactionRepository.create.mockReturnValue(MOCK_TRANSACTION);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('calls transactionsRepository.create', async () => {
      await transactionService.create(MOCK_DATA);

      expect(transactionRepository.create).toHaveBeenCalledWith(MOCK_DATA);
    });

    it('calls transactionsRepository.save', async () => {
      await transactionService.create(MOCK_DATA);

      expect(transactionRepository.save).toHaveBeenCalledWith(MOCK_TRANSACTION);
    });
  });
});
