import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsModule } from './rooms/rooms.module';
import { SuccessResponseIntercptor } from './services/success.response.interceptor';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/chatapp'),
        ConfigModule.forRoot({
            isGlobal: true
        }),
        UserModule,
        AuthModule,
        ChatModule,
        RoomsModule
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
