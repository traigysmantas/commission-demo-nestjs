import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1689076003282 implements MigrationInterface {
    name = 'CreateTables1689076003282'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transaction" ("transaction_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "client_id" integer NOT NULL, "date" TIMESTAMP NOT NULL, "exchange_rate" double precision NOT NULL, "base_amount" double precision NOT NULL, "base_currency" character varying NOT NULL, "amount" double precision NOT NULL, "commission" double precision NOT NULL, "currency" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_6e02e5a0a6a7400e1c944d1e946" PRIMARY KEY ("transaction_id"))`);
        await queryRunner.query(`CREATE TABLE "client_discount" ("client_id" integer NOT NULL, "discount" double precision NOT NULL, "discount_currency" character varying NOT NULL, CONSTRAINT "PK_262cbb5a862cc2e8bea04a2557d" PRIMARY KEY ("client_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "client_discount"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
    }

}
