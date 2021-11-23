import { Injectable } from '@nestjs/common';
import { Notice } from './notice.entity';
import { NoticeRepository } from './notice.repository';

@Injectable()
export class NoticeService {
  constructor(
    private noticeRepository: NoticeRepository,
  ) {}

  async viewAllNotice(page: number, pageSize: number): Promise<Notice[]> {
    const viewAllNoticeResult = await this.noticeRepository.find({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return viewAllNoticeResult;
  }
}
