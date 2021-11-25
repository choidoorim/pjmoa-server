import {
  EntityRepository,
  Repository,
  TransactionManager,
  EntityManager,
} from 'typeorm';
import { ProjectLike } from '../entities/project/projectLike.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(ProjectLike)
export class ProjectLikeRepository extends Repository<ProjectLike> {
  async findLikeByUserProjectIdx(
    userIdx: number,
    projectIdx: number,
  ): Promise<ProjectLike> {
    return await this.findOne({
      where: { userIdx: userIdx, projectIdx: projectIdx },
    });
  }

  async addGoodPoint(
    @TransactionManager() transactionManager: EntityManager,
    projectLikeInfo,
  ) {
    const projectLike: ProjectLike[] = this.create(projectLikeInfo);

    return await transactionManager.save(projectLike);
  }

  async changeGoodPoint(
    @TransactionManager() transactionManager: EntityManager,
    projectLikeInfo,
  ): Promise<ProjectLike> {
    const likeInfo: ProjectLike = await this.findLikeByUserProjectIdx(
      projectLikeInfo.userIdx,
      projectLikeInfo.projectIdx,
    );
    // 좋아요를 클릭 한 것이기에 현재 값에서 반대로.
    likeInfo.status = !likeInfo.status;

    return await transactionManager.save(likeInfo);
  }
}
