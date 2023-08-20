import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import {
  Crud,
  CrudAuth,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Crud({
  model: {
    type: User,
  },
  routes: {
    exclude: ['createOneBase', 'createManyBase'],
  },
  query: {
    exclude: ['password', 'activation_number'],
    join: {
      accounts: {
        alias: 'userAccounts',
        eager: true,
      },
      shares: {
        alias: 'userShares',
        eager: true,
      },
    },
  },
})
@Controller('user')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}

  get base(): CrudController<User> {
    return this;
  }

  @Post('activate')
  activate(@Body() body) {
    return this.service.activate(body);
  }
}
