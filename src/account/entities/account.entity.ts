import { Loan } from 'src/loan/entities/loan.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  accountNumber: number;

  @Column({ default: 'saving' })
  account_type: string;

  @Column({ default: 0 })
  balance: number;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;

  @OneToOne(() => Loan, (loan: Loan) => loan.account)
  loan: Loan;
}
