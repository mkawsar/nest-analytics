import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsModule } from './rooms/rooms.module';
import { SuccessResponseIntercptor } from './services/success.response.interceptor';
import { ChatModule } from './chat/chat.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/chatapp'),
        ConfigModule.forRoot({
            isGlobal: true
        }),
        UserModule,
        AuthModule,
        RoomsModule,
        ChatModule
    ],
    controllers: [],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: SuccessResponseIntercptor,
        },
    ]
})
export class AppModule {};
