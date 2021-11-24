import { Injectable } from '@nestjs/common';
import { Notice } from './notice.entity';
import { NoticeRepository } from './notice.repository';

@Injectable()
export class NoticeService {
  constructor(private noticeRepository: NoticeRepository) {}

  async viewAllNotice(page: number, pageSize: number): Promise<Notice[]> {
    return await this.noticeRepository.viewAllNotice(page, pageSize);
  }
}
