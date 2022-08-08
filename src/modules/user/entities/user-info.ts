import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '.';

export enum UserRank {
  NOVICE = 'novice',
  AMATEUR = 'amateur',
  ADEPT = 'adept',
  MASTER = 'master',
  GRANDMASTER = 'grandmaster'
}

@Entity()
export class UserInfo {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne(() => User, (user) => user.info)
  user!: User;

  @Column({ default: 0 })
  level!: number;

  @Column({ default: 0 })
  experience!: number;

  @Column({ default: 100 })
  experienceToNextLevel!: number;

  @Column({ type: 'enum', enum: UserRank, default: UserRank.NOVICE })
  rank!: UserRank;

  @Column({ default: 0 })
  reputation!: number;
}
