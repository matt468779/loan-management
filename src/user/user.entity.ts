import { Account } from 'src/account/entities/account.entity';
import { Share } from 'src/share/entities/share.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// import { Account } from 'src/modules/account/entities/account.entity';
// import { Share } from 'src/modules/share/entities/share.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: ' ' })
  first_name: string;

  @Column({ default: ' ' })
  last_name: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: ' ' })
  phone_number: string;

  @Column({ type: 'jsonb', nullable: true })
  address: string | string;

  @Column({ default: false })
  is_active: boolean;

  @Column({ nullable: true })
  activation_number: number;

  @OneToMany(() => Account, (accounts) => accounts.user)
  accounts: Account[];

  @OneToMany(() => Share, (shares) => shares.user)
  shares: Share[];
}
