import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from './chat/chat.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/chatapp'),
        UserModule,
        AuthModule,
        ChatModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {};
