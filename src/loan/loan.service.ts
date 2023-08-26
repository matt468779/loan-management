import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Loan } from './entities/loan.entity';

@Injectable()
export class LoanService extends TypeOrmCrudService<Loan> {
  constructor(@InjectRepository(Loan) public repo: Repository<Loan>) {
    super(repo);
  }
}
