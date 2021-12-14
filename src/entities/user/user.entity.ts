import { Entity, Column, BeforeInsert, OneToMany, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Common } from '../../app.entity';
import { Project } from '../project/project.entity';
import { ProjectLike } from '../project/projectLike.entity';
import { Participation } from '../project/participation.entity';
import { Member } from '../project/member.entity';

@Entity({ name: 'user' })
@Unique(['email', 'phoneNumber'])
export class User extends Common {
  @Column({ length: 45 })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ length: 15 })
  firstName: string;

  @Column({ length: 30 })
  lastName: string;

  @Column()
  age: number;

  @Column({ type: 'text' })
  imageUrl: string;

  @Column({ length: 15 })
  phoneNumber: string;

  @Column({ type: 'boolean', default: false })
  authStatus: boolean;

  @OneToMany(() => Project, (project) => project.user)
  project: Project[];

  @OneToMany(() => ProjectLike, (projectLike) => projectLike.user)
  projectLike: ProjectLike[];

  @OneToMany(() => Participation, (participation) => participation.user)
  participation: Participation[];

  @OneToMany(() => Member, (member) => member.user)
  member: Member[];

  // BeforeInsert() : DB 에 insert 되기 전에 이뤄지는 로직.
  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
