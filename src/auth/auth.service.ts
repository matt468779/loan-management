import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(phoneNumber: string, pass: string) {
    try {
      const user = await this.userService.findOne({
        where: {
          phoneNumber: phoneNumber,
        },
      });

      Logger.log('validate user');
      Logger.log(user.password);
      // const hashedPassword = await bcrypt.hash(pass, 10);
      if (
        user &&
        user.password &&
        (await bcrypt.compare(pass, user.password))
      ) {
        const { password, activationNumber, ...result } = user;
        return user;
      }
      return null;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      try {
        const createdUser = await this.userService.create(createUserDto);
        return createdUser;
      } catch (error) {
        throw new HttpException(
          'Something went wrong',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async login(user: User) {
    try {
      const payload = {
        sub: user.id,
        isActive: user.isActive,
        phoneNumber: user.phoneNumber,
        firstName: user.firstName,
      };
      Logger.log(user);
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
