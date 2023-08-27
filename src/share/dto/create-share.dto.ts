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
  shareDetails: string;

  @ApiProperty()
  @IsString()
  shareOwnerBank: string;

  @ApiProperty()
  @IsNumber()
  initialBalance: number;
}
