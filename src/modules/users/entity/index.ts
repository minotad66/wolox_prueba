import { CryptoCurrency } from '../../cryptocurrency/entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('increment', { name: 'user_id' })
  public id: number;

  @Column({ type: 'varchar', length: 128 })
  public name: string;

  @Column({ type: 'varchar', length: 128 })
  public lastName: string;

  @Column({ type: 'varchar', length: 128, unique: true })
  public username: string;

  @Column({ type: 'varchar', length: 128, select: false })
  public password: string;

  @Column({ type: 'varchar', length: 128 })
  public currency: string;

  @ManyToMany((type) => CryptoCurrency, (cryptocurrency) => cryptocurrency.id, {
    eager: true,
  })
  @JoinTable()
  crypto: CryptoCurrency[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  public updatedAt: Date;
}
