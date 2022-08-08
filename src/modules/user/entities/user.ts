import { BeforeInsert, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import bcrypt from 'bcrypt';
import { UserInfo } from './user-info';
import { CompletedTutorial } from '../../tutorials/entities/completed-tutorial';

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

  @OneToOne(() => UserInfo, (info) => info.user, { cascade: true })
  @JoinColumn()
  info!: UserInfo;

  @OneToMany(() => CompletedTutorial, (completedTutorial) => completedTutorial.user)
  @JoinColumn()
  completedTutorials!: CompletedTutorial[];

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
