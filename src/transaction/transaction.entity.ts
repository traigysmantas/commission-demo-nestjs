import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity()
@Index(['clientId', 'date'])
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  transactionId: string;

  @Index()
  @Column()
  clientId: number;

  @Column({ type: 'timestamp' })
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
    default: () => 'CURRENT_TIMESTAMP()',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  public updatedAt: Date;
}
