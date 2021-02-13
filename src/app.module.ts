import { Module } from '@nestjs/common';
import { TutorialModule } from './tutorial/tutorial.module';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TutorialModule,
    ChatModule,
    UserModule,
    AuthenticationModule,
    MongooseModule.forRoot('mongodb://root:example@mongo:27017/tavern?authSource=admin&w=1'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
