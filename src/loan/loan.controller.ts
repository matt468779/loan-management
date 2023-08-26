import { Controller } from '@nestjs/common';
import { LoanService } from './loan.service';
import {
  Crud,
  Override,
  ParsedRequest,
  CrudRequest,
  CrudController,
  ParsedBody,
} from '@nestjsx/crud';
import { Loan } from './entities/loan.entity';
import { CreateLoanDto } from './dto/create-loan.dto';

@Crud({
  model: {
    type: Loan,
  },
  query: {
    join: {
      account: {
        alias: 'loanAccount',
        eager: true,
      },
      share: {
        alias: 'loanShare',
        eager: true,
      },

      'account.user': { alias: 'loanAccountUser', eager: true },
      'share.user': { eager: true },
    },
  },
})
@Controller('loan')
export class LoanController {
  constructor(public service: LoanService) {}

  get base(): CrudController<Loan> {
    return this;
  }

  // @Override()
  // createOne(
  //   @ParsedRequest() req: CrudRequest,
  //   @ParsedBody() dto: CreateLoanDto,
  // ) {
  //   if share.
  //   return this.base.createOneBase(req, dto as Loan);
  // }
}
