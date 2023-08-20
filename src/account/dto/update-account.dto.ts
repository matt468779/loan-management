import { PartialType } from '@nestjs/swagger';
import { CreateAccountDto } from './create-account.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAccountDto extends PartialType(CreateAccountDto) {}
