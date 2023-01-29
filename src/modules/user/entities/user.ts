import { BeforeInsert, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CompletedTutorial } from '../../tutorials/entities/completed-tutorial';
import { UserInfo } from './user-info';
import bcrypt from 'bcrypt';

export enum UserRoles {
  USER = 'user',
  MODERATOR = 'moderator',
  ADMIN = 'admin'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true })
  firstName!: string;

  @Column({ nullable: true })
  lastName!: string;

  @Column()
  password!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true })
  username!: string;

  @Column({ default: false })
  isActive!: boolean;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.USER })
  role!: string;

  @OneToOne(() => UserInfo, (info) => info.user, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  info!: UserInfo;

  @OneToMany(() => CompletedTutorial, (completedTutorial) => completedTutorial.user, { onDelete: 'CASCADE' })
  @JoinColumn()
  completedTutorials!: CompletedTutorial[];

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
