import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Tutorial } from './tutorial';
import { User } from '../../user/entities';

@Entity()
export class CompletedTutorial {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.completedTutorials, { onDelete: 'CASCADE' })
  user!: User;

  @ManyToOne(() => Tutorial)
  tutorial!: Tutorial;

  @Column()
  isFinished!: boolean;

  @Column()
  finishedSteps!: number;
}
