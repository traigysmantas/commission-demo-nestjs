import { Test, TestingModule } from '@nestjs/testing';
import { DefaultRule } from './default-rule';
import { ConfigService } from '@nestjs/config';

describe('CommissionService', () => {
  let defaultRule: DefaultRule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DefaultRule,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: string) => {
              if (key === 'DEFAULT_RULE_MINIMUM_COMMISSION_IN_EUR') return 0.05;
              if (key === 'DEFAULT_RULE_COMMISSION_RATE') return 0.005;
            }),
          },
        },
      ],
    }).compile();

    defaultRule = module.get<DefaultRule>(DefaultRule);
  });

  it('returns minimum commission if calculated commision price is lower than it', () => {
    const commission = defaultRule.calculate({ client_id: 1, amount: 5, date: '2020-01-01' });

    expect(commission).toEqual(0.05);
  });

  it('returns calculated commision price if it is higher than min commision', () => {
    const commission = defaultRule.calculate({ client_id: 1, amount: 500, date: '2020-01-01' });

    expect(commission).toEqual(2.5);
  });
});
