import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Goods {
  @PrimaryGeneratedColumn('uuid')
  G_id: string;

  @Column()
  G_category: string;

  @Column({ nullable: true })
  G_thumb: string;

  @Column()
  G_info?: string;

  @Column({ type: 'int' })
  G_price: number;

  @Column({ type: 'int' })
  G_stock: number;
}
