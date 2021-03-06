import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectRepository } from './repository/project.repository';
import { ProjectLikeRepository } from './repository/projectLike.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectRepository, ProjectLikeRepository]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
