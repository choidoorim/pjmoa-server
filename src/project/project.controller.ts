import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateProjectDto } from '../dto/project/create-project.dto';
import { LikeProjectDto } from '../dto/project/like-project.dto';
import { ProjectService } from './project.service';
import { response_format, findLatLong } from '../app.utils';
import { baseResponse } from '../config/baseResponse';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {
    this.projectService = projectService;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async registerProject(@Body() projectInfo: CreateProjectDto, @Request() req) {
    if (req.user.idx !== projectInfo.userIdx) {
      return Object.assign(response_format.ERROR(baseResponse.TOKEN_NOT_MATCH));
    }

    const regionLocation = await findLatLong(projectInfo.region);

    // 위도 경도 데이터 추가.
    projectInfo['latitude'] = regionLocation.latitude;
    projectInfo['longitude'] = regionLocation.longitude;
    const registerProjectResult = await this.projectService.registerProject(
      projectInfo,
    );

    return Object.assign(
      response_format.SUCCESS(
        baseResponse.PROJECT_REGISTER_SUCCESS,
        registerProjectResult,
      ),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('like')
  async projectLikeChange(@Body() projectLikeInfo: LikeProjectDto) {
    const likeChangeResult = await this.projectService.projectLikeChange(
      projectLikeInfo,
    );
    return Object.assign(
      response_format.SUCCESS(
        baseResponse.PROJECT_LIKE_CHANGE_SUCCESS,
        likeChangeResult,
      ),
    );
  }
}
