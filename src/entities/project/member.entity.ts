import { Entity, Column, ManyToOne } from 'typeorm';
import { Common } from '../../app.entity';
import { Project } from './project.entity';
import { User } from '../user/user.entity';

@Entity({ name: 'member' })
export class Member extends Common {
  @Column()
  projectIdx: number;

  @Column()
  userIdx: number;

  @ManyToOne(() => Project, (project) => project.member)
  project: Project;

  @ManyToOne(() => User, (user) => user.member)
  user: User;
}
