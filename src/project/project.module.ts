import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectRepository } from './project.repository';
import { ProjectLikeRepository } from './projectLike.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectRepository, ProjectLikeRepository]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
