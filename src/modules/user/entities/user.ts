import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  username!: string;

  @Column({ default: false })
  isActive!: boolean;
}
