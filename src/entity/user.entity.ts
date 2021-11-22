import { Entity, Column, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Common } from './common.entity';
import { Project } from './project.entity';

@Entity({ name: 'user' })
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

  @Column({ default: false })
  authStatus: boolean;

  @OneToMany((type) => Project, (project) => project.userIdx)
  project: Project[];

  // BeforeInsert() : DB 에 insert 되기 전에 이뤄지는 로직.
  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
