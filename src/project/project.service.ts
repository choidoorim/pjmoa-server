import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from './repository/project.repository';
import { getConnection, InsertResult, QueryRunner } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectLikeRepository } from './repository/projectLike.repository';
import { PaginationDto } from './dto/pagination.dto';
import { LikeProjectDto } from './dto/like-project.dto';
import { ProjectLike } from '../entities/project/projectLike.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import {Project} from "../entities/project/project.entity";

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

  async viewProject(projectIdx: number) {
    try {
      const viewProjectResult = await this.projectRepository.viewProject(
        projectIdx,
      );
      // 기능 구현은 됨(하지만 하드코딩.). typeorm 의 join on 이 안되는 문제(?) 를 어떻게 해결해야 될까..
      const result = [];
      for (let i = 0; i < viewProjectResult.projectLike.length; i++) {
        if (viewProjectResult.projectLike[i].status === true) {
          result.push(viewProjectResult.projectLike[i]);
        }
      }
      viewProjectResult.projectLike = result;
      return viewProjectResult;
    } catch (error) {
      throw new NotFoundException(`Failed View Project - ${error}`);
    }
  }

  async registerProject(projectInfo: CreateProjectDto): Promise<Project[]> {
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

  async projectLikeChange(
    projectLikeInfo: LikeProjectDto,
  ): Promise<InsertResult | ProjectLike> {
    let projectLikeResult;
    const queryRunner: QueryRunner = await getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const findLikeStatus =
        await this.projectLikeRepository.findLikeByUserProjectIdx(
          projectLikeInfo,
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
