import { EntityRepository, Repository } from 'typeorm';
import { Notice } from '../entities/notice/notice.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(Notice)
export class NoticeRepository extends Repository<Notice> {
  async viewAllNotice(page: number, pageSize: number): Promise<Notice[]> {
    return await this.find({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }
}
