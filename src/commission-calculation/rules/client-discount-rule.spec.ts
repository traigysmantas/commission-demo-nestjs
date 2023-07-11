import { Test, TestingModule } from '@nestjs/testing';
import { ClientDiscountRule } from './client-discount-rule';
import { mockDeep } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import { ClientDiscount } from '../client-discount.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ClientDiscountRule', () => {
  let clientDiscountRule: ClientDiscountRule;

  const clientDiscountRepository = mockDeep<Repository<ClientDiscount>>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientDiscountRule,
        {
          provide: getRepositoryToken(ClientDiscount),
          useValue: clientDiscountRepository,
        },
      ],
    }).compile();

    clientDiscountRule = module.get<ClientDiscountRule>(ClientDiscountRule);
  });

  it('returns null if discount for client_id is not applicable', async () => {
    const commission = await clientDiscountRule.calculate({
      client_id: 1,
      date: '2020-01-01',
      amount: 10,
    });

    expect(commission).toBeNull();
  });

  it('returns calculated commision price for client with ID: 42', async () => {
    clientDiscountRepository.findOne.mockResolvedValue({
      clientId: 42,
      discount: 0.05,
      discountCurrency: 'EUR',
    });

    const commission = await clientDiscountRule.calculate({
      client_id: 42,
      date: '2020-01-01',
      amount: 3000,
    });

    expect(commission).toEqual(0.05);
  });
});
