import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop()
  avatar: string;

  @Prop({ required: true })
  nick: string;

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

  @Prop({
    default: [{
      title: 'Witaj w Tavern, Podróżniku!',
      description: 'Jeśli czujesz się zagubiony zapraszamy do tawerny - znajdziesz ją po lewej stroni mapy.  Możesz tam odpocząć i porozmawiać ze starymi wyjadaczami.\n' +
        'Jeśli natomiast należysz do bardziej walecznych, spróbuj się na pobliskich kursach, są po prawej stronie.'
    }]
  })
  notes: {
    title: string;
    description: string;
  }[];

  @Prop()
  finishedCoursesIds: number[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);