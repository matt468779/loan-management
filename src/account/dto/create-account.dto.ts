import { ApiProperty } from '@nestjs/swagger';
import { Account } from '../entities/account.entity';
import { IsNumber, IsString, isNumber } from 'class-validator';
import { User } from 'src/user/user.entity';

export class CreateAccountDto {
  @ApiProperty()
  user: User;

  @ApiProperty()
  @IsString()
  accountType: string;

  @ApiProperty()
  @IsNumber()
  initialBalance: number;
}
