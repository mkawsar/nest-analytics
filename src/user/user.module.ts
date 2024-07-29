import { Module } from '@nestjs/common';
import { User, UserSchema } from './user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ],
    controllers: [UserController]
})
export class UserModule {}
