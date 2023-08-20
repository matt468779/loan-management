import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  account_number: number;

  @Column({ default: 'saving' })
  account_type: string;

  @Column({ default: 0 })
  balance: number;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;
}
