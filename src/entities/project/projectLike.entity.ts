import { Common } from '../../app.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Project } from './project.entity';
import { User } from '../user/user.entity';

@Entity({ name: 'projectLike' })
export class ProjectLike extends Common {
  @Column()
  userIdx: number;

  @Column()
  projectIdx: number;

  @ManyToOne(() => User, (user) => user.projectLike)
  user: User;

  @ManyToOne(() => Project, (project) => project.projectLike)
  project: Project;
}
