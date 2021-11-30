import {
  EntityRepository,
  Repository,
  TransactionManager,
  EntityManager,
  InsertResult,
} from 'typeorm';
import { ProjectLike } from '../../entities/project/projectLike.entity';
import { Injectable } from '@nestjs/common';
import { LikeProjectDto } from '../dto/like-project.dto';

@Injectable()
@EntityRepository(ProjectLike)
export class ProjectLikeRepository extends Repository<ProjectLike> {
  async findLikeByUserProjectIdx(
    projectLikeInfo: LikeProjectDto,
  ): Promise<ProjectLike> {
    return await this.findOne({
      where: {
        userIdx: projectLikeInfo.userIdx,
        projectIdx: projectLikeInfo.projectIdx,
      },
    });
  }

  async addGoodPoint(
    @TransactionManager() transactionManager: EntityManager,
    projectLikeInfo: LikeProjectDto,
  ): Promise<InsertResult> {
    return await transactionManager
      .createQueryBuilder()
      .insert()
      .into(ProjectLike)
      .values({
        userIdx: projectLikeInfo.userIdx,
        projectIdx: projectLikeInfo.projectIdx,
      })
      .execute();
  }

  async changeGoodPoint(
    @TransactionManager() transactionManager: EntityManager,
    projectLikeInfo: LikeProjectDto,
  ): Promise<ProjectLike> {
    const likeInfo: ProjectLike = await this.findLikeByUserProjectIdx(
      projectLikeInfo,
    );
    likeInfo.status = !likeInfo.status;

    return await transactionManager.save(likeInfo);
  }
}
