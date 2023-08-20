import { Module } from '@nestjs/common';
import { ShareService } from './share.service';
import { ShareController } from './share.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Share } from './entities/share.entity';

@Module({
  controllers: [ShareController],
  providers: [ShareService],
  imports: [TypeOrmModule.forFeature([Share, User])],
})
export class ShareModule {}
