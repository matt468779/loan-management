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
  firstName: string;

  @Column({ default: ' ' })
  lastName: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: ' ' })
  phoneNumber: string;

  @Column({ type: 'jsonb', nullable: true })
  address: string | string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ nullable: true })
  activationNumber: number;

  @OneToMany(() => Account, (accounts) => accounts.user)
  accounts: Account[];

  @OneToMany(() => Share, (shares) => shares.user)
  shares: Share[];
}
