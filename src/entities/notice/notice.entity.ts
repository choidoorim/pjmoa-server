import { Column, Entity } from 'typeorm';
import { Common } from '../../app.entity';

@Entity({ name: 'notice' })
export class Notice extends Common {
  @Column({ length: 100 })
  title: string;

  @Column({ length: 1000 })
  contents: string;
}
