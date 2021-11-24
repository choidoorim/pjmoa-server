import { Controller, Get, Param, Query } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { response_format } from '../config/app.utils';
import { baseResponse } from '../config/app.response';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  // /notice?page=&pageSize=
  @Get()
  async viewAllNotice(@Query() query) {
    // page: n 번째 페이지, pageSize: 조회할 페이지의 크기
    const viewAllNoticeResult = await this.noticeService.viewAllNotice(
      query.page,
      query.pageSize,
    );
    return Object.assign(
      response_format.SUCCESS(baseResponse.NOTICE_LOOKUP_SUCCESS, {
        ...viewAllNoticeResult,
      }),
    );
  }
}
