import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  transactionId: string;

  @Column()
  clientId: number;

  @Column({
    type: 'timestamp',
  })
  date: Date;

  @Column({ type: 'double precision' })
  exchangeRate: number;

  @Column({ type: 'double precision' })
  baseAmount: number;

  @Column()
  baseCurrency: string;

  @Column({ type: 'double precision' })
  amount: number;

  @Column({ type: 'double precision' })
  commission: number;

  @Column()
  currency: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;
}
