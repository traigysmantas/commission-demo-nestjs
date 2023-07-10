import { Test, TestingModule } from '@nestjs/testing';
import { TransactionCommissionController } from './transaction-commission.controller';
import { TransactionCommissionService } from './transaction-commission.service';

describe('TransactionCommissionController', () => {
  let controller: TransactionCommissionController;

  const mockTransactonCommissionService: Partial<TransactionCommissionService> = {
    calculateCommission: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionCommissionController],
      providers: [
        {
          provide: TransactionCommissionService,
          useValue: mockTransactonCommissionService,
        },
      ],
    }).compile();

    controller = module.get<TransactionCommissionController>(TransactionCommissionController);
  });

  it('calls calculateCommission with correct data', async () => {
    const data = {
      amount: 100,
      client_id: 1,
      currency: 'EUR',
      date: '2021-01-01',
    };

    await controller.calculateCommission(data);

    expect(mockTransactonCommissionService.calculateCommission).toHaveBeenCalledWith(data);
  });
});
