import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { Share } from 'src/share/entities/share.entity';
import { Loan } from './entities/loan.entity';
import { User } from 'src/user/user.entity';

@Module({
  controllers: [LoanController],
  providers: [LoanService],
  imports: [TypeOrmModule.forFeature([Loan, Share, Account, User])],
})
export class LoanModule {}
