import {
  EntityRepository,
  Repository,
  TransactionManager,
  EntityManager,
} from 'typeorm';
import { Project } from './project.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {

}
