import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) repo: Repository<User>) {
    super(repo);
  }

  async create(createUserDto: CreateUserDto) {
    Logger.log(createUserDto.phoneNumber);
    const result = await this.repo.save(createUserDto);
    result.activationNumber = undefined;
    return result;
  }

  async activate(req) {
    const user: User = await this.repo.findOne({
      where: { phoneNumber: req.phoneNumber },
    });
    Logger.log(req);
    Logger.log(user);
    if (!user) {
      return new BadRequestException('phone number incorrect');
    }
    if (user.isActive) {
      return new BadRequestException('User already activated');
    }
    if (user.activationNumber != req.activationNumber) {
      return new BadRequestException('Activation number incorrect');
    }

    user.isActive = true;
    user.password = await bcrypt.hash(req.password, 10);
    await this.repo.update(user.id, user);
  }
}
