import { Module } from '@nestjs/common';
import { TutorialModule } from './tutorial/tutorial.module';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './auth/authentication.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TutorialModule,
    ChatModule,
    UserModule,
    AuthenticationModule,
    MongooseModule.forRoot('mongodb://root:example@mongo:27017/tavern?authSource=admin&w=1'),
    ConfigModule.forRoot()
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
