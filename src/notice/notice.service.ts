import { Injectable } from '@nestjs/common';
import { Notice } from '../entity/notice.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice) private noticeRepository: Repository<Notice>,
  ) {}

  async viewAllNotice(page: number, pageSize: number): Promise<Notice[]> {
    const viewAllNoticeResult = await this.noticeRepository.find({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return viewAllNoticeResult;
  }
}
