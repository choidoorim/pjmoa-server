import {
  EntityRepository,
  Repository,
  TransactionManager,
  EntityManager,
} from 'typeorm';
import { Project } from '../../entities/project/project.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  async registerProject(
    @TransactionManager() transactionManager: EntityManager,
    projectInfo,
  ): Promise<Project[]> {
    const project: Project[] = this.create(projectInfo);

    return transactionManager.save(project);
  }
}
