import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { TutorialStep } from './tutorial-step';

@Entity()
export class Tutorial {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'int' })
  stepsAmount!: number;

  @OneToMany(() => TutorialStep, (step) => step.parent, { cascade: true })
  steps!: TutorialStep[];

  @Column({ default: false })
  isActive!: boolean;
}
