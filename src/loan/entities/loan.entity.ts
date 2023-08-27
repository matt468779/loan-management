import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Share } from '../../share/entities/share.entity';
import { Account } from 'src/account/entities/account.entity';

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Share, { eager: true, cascade: true })
  @JoinColumn()
  share: Share;

  @OneToOne(() => Account, { eager: true, cascade: true })
  @JoinColumn()
  account: Account;

  @Column()
  paymentDue: number;

  @Column()
  amount: number;
}
