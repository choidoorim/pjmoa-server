import { Injectable } from '@nestjs/common';
import { Notice } from '../entities/notice/notice.entity';
import { NoticeRepository } from './repository/notice.repository';

@Injectable()
export class NoticeService {
  constructor(private noticeRepository: NoticeRepository) {}

  async viewAllNotice(page: number, pageSize: number): Promise<Notice[]> {
    return await this.noticeRepository.viewAllNotice(page, pageSize);
  }
}
