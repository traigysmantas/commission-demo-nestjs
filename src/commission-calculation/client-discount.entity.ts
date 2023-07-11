import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class ClientDiscount {
  @PrimaryColumn()
  clientId: number;

  @Column({ type: 'double precision' })
  discount: number;

  @Column()
  discountCurrency: string;
}
