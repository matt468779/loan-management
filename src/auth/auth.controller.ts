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
    const user: User = await this.authService.validateUser(
      body.phoneNumber,
      body.password,
    );
    if (user) {
      return this.authService.login(user);
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
        where: { phoneNumber: createUserDto.phoneNumber },
      }))
    ) {
      const activationNumber = Math.floor(1000 + Math.random() * 9000);
      Logger.log(activationNumber);

      const user = new User();
      user.firstName = createUserDto.firstName;
      user.lastName = createUserDto.lastName;
      user.activationNumber = activationNumber;
      user.address = createUserDto.address;
      user.phoneNumber = createUserDto.phoneNumber;

      return this.userService.create(user);
    } else {
      return new BadRequestException('Phone number already has an account');
    }
  }
}
