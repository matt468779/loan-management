import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) repo: Repository<User>) {
    super(repo);
  }

  async create(create_user_dto: CreateUserDto) {
    Logger.log(create_user_dto.phone_number);
    const result = await this.repo.save(create_user_dto);
    result.activation_number = undefined;
    return result;
  }

  async activate(req) {
    const user: User = await this.repo.findOne({
      where: { phone_number: req.phone_number },
    });
    Logger.log(req);
    Logger.log(user);
    if (!user) {
      return new BadRequestException('phone number incorrect');
    }
    if (user.is_active) {
      return new BadRequestException('User already activated');
    }
    if (user.activation_number != req.activation_number) {
      return new BadRequestException('Activation number incorrect');
    }

    user.is_active = true;
    await this.repo.update(user.id, user);
  }
}
