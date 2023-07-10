import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import supertest from 'supertest';
import { AppModule } from '../src/app.module';
import mockdate from 'mockdate';
import { CreateTransactionCommissionDto } from '../src/transaction-commission/dto/create-transaction-commission.dto';
import { Transaction } from '../src/transaction/transaction.entity';
import { Repository } from 'typeorm';
import { buildTransaction } from './test-utils';

// TODO: Investigate how to disable Pino logger automatic tests
// TODO: Investigate how to hook jest-runner for e2e tests
// TOOD: Investigate why jest is not finishing correctly
describe('TransactionCommission', () => {
  let app: INestApplication;
  let transactionRepository: Repository<Transaction>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    transactionRepository = moduleFixture.get('TransactionRepository');

    await app.init();
  });

  afterEach(async () => {
    await transactionRepository.clear();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /transaction-commission', () => {
    const makeCommissionPostRequest = <T>(body: Partial<T>) =>
      supertest(app.getHttpServer())
        .post('/transaction-commission')
        .send({
          date: '2023-07-10',
          amount: '100',
          client_id: 1,
          currency: 'EUR',
          ...body,
        });

    beforeEach(() => {
      mockdate.set(new Date('2023-07-15T04:00:00.123Z'));
    });

    afterEach(() => {
      mockdate.reset();
    });

    it('returns 400 if unknown currency is used', async () => {
      const response = await makeCommissionPostRequest<CreateTransactionCommissionDto>({ currency: 'FAKE_USD' });

      expect(response.status).toBe(400);
    });

    it('returns 400 if date in future is used', async () => {
      const response = await makeCommissionPostRequest<CreateTransactionCommissionDto>({ date: '2024-01-01' }).expect(
        400,
      );

      expect(response.status).toBe(400);
    });

    it('returns default commission for user without any discounts', async () => {
      const response = await makeCommissionPostRequest<CreateTransactionCommissionDto>({ client_id: 1, amount: 500 });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ amount: '2.50', currency: 'EUR' });
    });

    it('returns client discount commission for client 42', async () => {
      const response = await makeCommissionPostRequest<CreateTransactionCommissionDto>({ client_id: 42, amount: 3000 });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ amount: '0.05', currency: 'EUR' });
    });

    it('returns high turnover discount for client with transaction turnover higher than 1000 in request month', async () => {
      const entities = [
        buildTransaction({ date: '2021-01-03', baseAmount: 500, clientId: 1, baseCurrency: 'EUR' }),
        buildTransaction({ date: '2021-01-04', baseAmount: 499, clientId: 1, baseCurrency: 'EUR' }),
        buildTransaction({ date: '2021-01-05', baseAmount: 100, clientId: 1, baseCurrency: 'EUR' }),
      ].map((dto) => transactionRepository.create(dto));

      await transactionRepository.save(entities);

      const highTurnoverCommissionResponse = await makeCommissionPostRequest<CreateTransactionCommissionDto>({
        client_id: 1,
        amount: 1,
        date: '2021-01-06',
      });

      const defaultCommissionResponse = await makeCommissionPostRequest<CreateTransactionCommissionDto>({
        client_id: 1,
        amount: 500,
        date: '2021-02-01',
      });

      expect(highTurnoverCommissionResponse.status).toBe(201);
      expect(highTurnoverCommissionResponse.body).toEqual({ amount: '0.03', currency: 'EUR' });
      expect(defaultCommissionResponse.body).toEqual({ amount: '2.50', currency: 'EUR' });
    });
  });
});
