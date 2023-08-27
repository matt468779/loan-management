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
export class Share {
  @PrimaryGeneratedColumn('uuid')
  certificateNumber: string;

  @Column({ default: '' })
  shareDetails: string;

  @Column({ default: 1 })
  price: number;

  @Column({ default: 0 })
  amount: number;

  @Column({ type: 'date', default: () => 'NOW()' })
  purchaseDate: string;

  @Column({ default: 'Addis International Bank' })
  shareOwnerBank: string;

  @ManyToOne(() => User, (user) => user.shares)
  user: User;

  @OneToOne(() => Loan, (loan: Loan) => loan.share)
  loan: Loan;
}
