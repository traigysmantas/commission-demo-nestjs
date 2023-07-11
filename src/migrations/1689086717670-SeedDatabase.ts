import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDatabase1689086717670 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`INSERT INTO client_discount (client_id, discount, discount_currency)
        VALUES (42, 0.05, 'EUR')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DELETE FROM client_discount WHERE client_id = 42`);
  }
}
