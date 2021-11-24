import { Body, Controller, Post } from '@nestjs/common';
import * as NodeGeocoder from 'node-geocoder';
import { CreateProjectDto } from '../dto/project/create-project.dto';

@Controller('project')
export class ProjectController {
  @Post()
  async registerProject(@Body() projectInfo: CreateProjectDto) {
    const options = {
      provider: 'openstreetmap',
    };
    const geocoder = NodeGeocoder(options);
    const [result] = await geocoder.geocode(projectInfo.region);
    console.log(result.latitude, result.longitude);
    return result;
  }

  // 프로젝트 조회 시 조장 전화번호 기입?
}
