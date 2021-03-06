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
import { Participation } from './participation.entity';
import { Member } from './member.entity';

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

  @Column({ type: 'decimal', precision: 18, scale: 10 })
  latitude: number;

  @Column({ type: 'decimal', precision: 18, scale: 10 })
  longitude: number;

  @ManyToOne(() => User, (user) => user.project)
  user: User;

  @OneToMany(() => ProjectLike, (projectLike) => projectLike.project)
  projectLike: ProjectLike[];

  @OneToMany(() => Participation, (participation) => participation.project)
  participation: Participation[];

  @OneToMany(() => Member, (member) => member.project)
  member: Member[];
}
