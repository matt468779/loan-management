import { Unique } from 'typeorm';
import { IsEmail, IsJSON, IsString } from 'class-validator';
@Unique(['phone_number'])
export class CreateUserDto {
  @IsString()
  first_name: string;
  @IsString()
  last_name: string;
  @IsEmail()
  phone_number: string;
  @IsString()
  password: string;
  @IsJSON()
  address: string;
}
