import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Common } from '../../app.entity';
import { User } from '../user/user.entity';
import { ProjectLike } from './projectLike.entity';

@Entity({ name: 'project' })
export class Project extends Common {
  @Column()
  userIdx: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  startDate: Date;

  @CreateDateColumn({
    type: 'timestamp',
  })
  endDate: Date;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 1000 })
  contents: string;

  @Column()
  maxUser: number;

  @Column({ length: 10 })
  kind: string;

  @Column({ length: 20 })
  region: string;

  @Column({ type: 'decimal' })
  latitude: number;

  @Column({ type: 'decimal' })
  longitude: number;

  @ManyToOne(() => User, (user) => user.idx)
  user: User;

  @OneToMany(() => ProjectLike, (projectLike) => projectLike.projectIdx)
  projectLike: ProjectLike[];
}