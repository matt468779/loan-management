import { Unique } from 'typeorm';
import { IsEmail, IsJSON, IsString } from 'class-validator';
@Unique(['phoneNumber'])
export class CreateUserDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsEmail()
  phoneNumber: string;
  @IsString()
  password: string;
  @IsJSON()
  address: string;
}
