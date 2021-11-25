import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';
import { NoticeRepository } from './repository/notice.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NoticeRepository])],
  controllers: [NoticeController],
  providers: [NoticeService],
})
export class NoticeModule {}
