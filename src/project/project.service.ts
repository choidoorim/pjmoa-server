import { Injectable } from '@nestjs/common';
import { ProjectRepository } from './project.repository';
import { getConnection, QueryRunner } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(private projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
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
    } finally {
      await queryRunner.release();
    }
  }
}
