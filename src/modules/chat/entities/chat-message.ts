import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities';

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user!: User;

  @Column()
  message!: string;

  @Column({ default: 0 })
  likeCount!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
