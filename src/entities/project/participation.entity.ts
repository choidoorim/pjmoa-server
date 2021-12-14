import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { Common } from '../../app.entity';
import { User } from '../user/user.entity';
import { Project } from './project.entity';

@Entity({ name: 'participation' })
export class Participation extends Common {
  @Column()
  projectIdx: number;

  @Column()
  userIdx: number;

  @Column({ length: 1000 })
  contents: string;

  @ManyToOne(() => User, (user) => user.participation)
  user: User;

  @ManyToOne(() => Project, (project) => project.participation)
  project: Project;
}
