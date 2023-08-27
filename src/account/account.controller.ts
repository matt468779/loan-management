import { Controller } from '@nestjs/common';
import { AccountService } from './account.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { Account } from './entities/account.entity';

@Crud({
  model: {
    type: Account,
  },
  params: {
    accountNumber: {
      field: 'accountNumber',
      type: 'number',
      primary: true,
    },
  },
  query: {
    join: {
      user: {
        alias: 'accountUser',
        eager: true,
      },
    },
    alwaysPaginate: true,
  },
})
@Controller('account')
export class AccountController implements CrudController<Account> {
  constructor(public service: AccountService) {}
}
