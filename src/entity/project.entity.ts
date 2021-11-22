import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { Contents } from './common.entity';
import { User } from './user.entity';

@Entity({ name: 'project' })
export class Project extends Contents {
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

  @ManyToOne((type) => User, (user) => user.idx)
  user: User;
}
