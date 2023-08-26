import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsNumber } from 'class-validator';
import { Account } from 'src/account/entities/account.entity';
import { Share } from 'src/share/entities/share.entity';

export class CreateLoanDto {
  @ApiProperty()
  account: Account;

  @ApiProperty()
  share: Share;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNumber()
  payment_due: number;
}
