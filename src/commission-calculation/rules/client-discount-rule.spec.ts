import { Test, TestingModule } from '@nestjs/testing';
import { ClientDiscountRule } from './client-discount-rule';

describe('ClientDiscountRule', () => {
  let clientDiscountRule: ClientDiscountRule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientDiscountRule],
    }).compile();

    clientDiscountRule = module.get<ClientDiscountRule>(ClientDiscountRule);

    clientDiscountRule = new ClientDiscountRule();
  });

  it('returns null if discount for client_id is not applicable', () => {
    const commission = clientDiscountRule.calculate({
      client_id: 1,
      date: '2020-01-01',
      amount: 10,
    });

    expect(commission).toBeNull();
  });

  it('returns calculated commision price for client with ID: 42', () => {
    const commission = clientDiscountRule.calculate({
      client_id: 42,
      date: '2020-01-01',
      amount: 3000,
    });

    expect(commission).toEqual(0.05);
  });
});
