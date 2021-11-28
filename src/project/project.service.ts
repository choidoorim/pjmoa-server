import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from './repository/project.repository';
import { getConnection, QueryRunner } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectLikeRepository } from './repository/projectLike.repository';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectRepository)
    private projectRepository: ProjectRepository,
    @InjectRepository(ProjectLikeRepository)
    private projectLikeRepository: ProjectLikeRepository,
  ) {
    this.projectRepository = projectRepository;
    this.projectLikeRepository = projectLikeRepository;
  }

  async viewAllProject(query: PaginationDto) {
    try {
      return await this.projectRepository.viewAllProject(query);
    } catch (error) {
      throw new NotFoundException(`Failed View All Project - ${error}`);
    }
  }

  async registerProject(projectInfo) {
    const queryRunner: QueryRunner = await getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const registerProjectResult =
        await this.projectRepository.registerProject(
          queryRunner.manager,
          projectInfo,
        );
      await queryRunner.commitTransaction();
      return registerProjectResult;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new NotFoundException(`Failed Register Project - ${error}`);
    } finally {
      await queryRunner.release();
    }
  }

  async projectLikeChange(projectLikeInfo) {
    let projectLikeResult;
    const queryRunner: QueryRunner = await getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const findLikeStatus =
        await this.projectLikeRepository.findLikeByUserProjectIdx(
          projectLikeInfo.userIdx,
          projectLikeInfo.projectIdx,
        );
      // 좋아요를 처음 클릭했을 때
      if (!findLikeStatus) {
        projectLikeResult = await this.projectLikeRepository.addGoodPoint(
          queryRunner.manager,
          projectLikeInfo,
        );
      } else {
        projectLikeResult = await this.projectLikeRepository.changeGoodPoint(
          queryRunner.manager,
          projectLikeInfo,
        );
      }
      await queryRunner.commitTransaction();
      return projectLikeResult;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new NotFoundException(`Failed project LikeChange - ${error}`);
    } finally {
      await queryRunner.release();
    }
  }
}
