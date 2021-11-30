import {
  EntityManager,
  EntityRepository,
  Repository,
  TransactionManager,
} from 'typeorm';
import { Project } from '../../entities/project/project.entity';
import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../dto/pagination.dto';

@Injectable()
@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  async viewAllProject(query: PaginationDto) {
    // const queryBuilder = await this.createQueryBuilder('project')
    //   .leftJoinAndSelect('project.projectLike', 'projectLike')
    //   .where('project.status = :projectStatus', { projectStatus: true })
    //   .orderBy('project.createdAt', 'DESC')
    //   .skip(query.getSkip())
    //   .take(query.getTake())
    //   .getMany();
    return await this
      .query(`select *, (select count(*) from projectLike pL where p.idx = pL.projectIdx and pL.status = true) as projectLikeCount
                    from project p
                    where p.status = true order by p.createdAt DESC LIMIT ${query.getSkip()}, ${query.getTake()}
                    `);
  }

  async viewProject(projectIdx: number) {
    const queryBuilder = this.createQueryBuilder('project')
      .leftJoinAndSelect('project.projectLike', 'projectLike')
      .where('project.status = :status', { status: true })
      .andWhere('project.idx = :projectIdx', { projectIdx: projectIdx });

    return queryBuilder.getOne();
  }

  async registerProject(
    @TransactionManager() transactionManager: EntityManager,
    projectInfo,
  ): Promise<Project[]> {
    const project: Project[] = this.create(projectInfo);

    return transactionManager.save(project);
  }
}
