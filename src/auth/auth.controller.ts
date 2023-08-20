import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  Post,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { Response } from 'express';
import { User } from 'src/user/user.entity';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() body) {
    if (await this.authService.validateUser(body.phone_number, body.password)) {
      return this.authService.login(body);
    } else {
      return new UnauthorizedException('phone number or password is incorrect');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('Set-Cookie', 'Authentication=; HttpOnly; Path=/; Max-Age=0');
    return { message: 'Logged out successfully' };
  }

  @Post('user/register')
  async create(@Body() createUserDto: CreateUserDto) {
    if (
      !(await this.userService.findOne({
        where: { phone_number: createUserDto.phone_number },
      }))
    ) {
      const activation_number = Math.floor(1000 + Math.random() * 9000);
      Logger.log(activation_number);

      const user = new User();
      user.first_name = createUserDto.first_name;
      user.last_name = createUserDto.last_name;
      user.activation_number = activation_number;
      user.address = createUserDto.address;
      user.phone_number = createUserDto.phone_number;

      return this.userService.create(user);
    } else {
      return new BadRequestException('Phone number already has an account');
    }
  }
}
