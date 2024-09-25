import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/chatapp'),
        UserModule,
        AuthModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {};
