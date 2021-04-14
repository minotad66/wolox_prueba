import { Users } from '../../users/entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('crypto_currency')
export class CryptoCurrency {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ type: 'varchar', length: 128, unique: true, default: null })
  public id_crypto: string;

  @Column({ type: 'varchar', length: 128, unique: true, default: null })
  public name: string;

  @Column({ type: 'varchar', length: 128, unique: true, default: null })
  public symbol: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  public updatedAt: Date;
}
