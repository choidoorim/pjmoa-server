import { Controller, Get, Param, Query } from '@nestjs/common';
import { NoticeService } from './notice.service';

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
    return Object.assign({
      isSuccess: true,
      statusCode: 200,
      statusMsg: 'create-User Success',
      data: { ...viewAllNoticeResult },
    });
  }
}
