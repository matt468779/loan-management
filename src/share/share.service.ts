import { Injectable } from '@nestjs/common';
import { Share } from './entities/share.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class ShareService extends TypeOrmCrudService<Share> {
  constructor(@InjectRepository(Share) public repo: Repository<Share>) {
    super(repo);
  }
}
