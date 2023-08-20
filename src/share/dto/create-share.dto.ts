import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { User } from 'src/user/user.entity';

export class CreateShareDto {
  @ApiProperty()
  user: User;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  share_details: string;

  @ApiProperty()
  @IsString()
  share_owner_bank: string;

  @ApiProperty()
  @IsNumber()
  initial_balance: number;
}
