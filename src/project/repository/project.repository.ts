import {
  EntityRepository,
  Repository,
  TransactionManager,
  EntityManager,
} from 'typeorm';
import { Project } from '../../entities/project/project.entity';
import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../dto/pagination.dto';

@Injectable()
@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  async viewAllProject(query: PaginationDto) {
    const queryBuilder = this.createQueryBuilder('project')
      .leftJoinAndSelect('project.projectLike', 'projectLike')
      .where('project.status = :status', { status: true })
      .orderBy('project.createdAt', 'DESC')
      .skip(query.getSkip())
      .take(query.getTake());

    return queryBuilder.getManyAndCount();
  }

  async registerProject(
    @TransactionManager() transactionManager: EntityManager,
    projectInfo,
  ): Promise<Project[]> {
    const project: Project[] = this.create(projectInfo);

    return transactionManager.save(project);
  }
}
