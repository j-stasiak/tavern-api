import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Tutorial } from './tutorial';

@Entity()
export class TutorialStep {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true })
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'int' })
  stepNumber!: number;

  @ManyToOne(() => Tutorial, (tutorial) => tutorial.steps)
  parent!: Tutorial;

  @Column({ default: false })
  isActive!: boolean;

  @Column({ default: 100 })
  expGrant!: number;

  @Column({ nullable: true })
  expectedResult!: string;
}
