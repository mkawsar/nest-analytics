import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
// import { AppService } from "./app.service";
// import { AppController } from "./app.controller";
import { UserModule } from './user/user.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb:localhost:27017/chatapp'),
        UserModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {};
