import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop()
  avatar: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  verified: boolean;

  @Prop({ default: 'Nowicjusz' })
  rank: string;

  @Prop({ default: 0 })
  reputation: number;

  @Prop()
  notes: {
    title: string;
    description: string;
  }[];

  @Prop()
  finishedCoursesIds: number[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);