import {
  EntityRepository,
  Repository,
  TransactionManager,
  EntityManager,
} from 'typeorm';
import { Notice } from './notice.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(Notice)
export class NoticeRepository extends Repository<Notice> {}
