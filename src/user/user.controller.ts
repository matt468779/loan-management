import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Crud({
  model: {
    type: User,
  },
  routes: {
    exclude: ['createOneBase', 'createManyBase'],
  },
  query: {
    exclude: ['password', 'activationNumber'],
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
    alwaysPaginate: true,
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

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Request() req) {
    Logger.log(req.user);
    const user: User = await this.service.findOne({
      where: { id: req.user.id },
    });
    return { ...user, password: undefined, activationNumber: undefined };
  }
}
