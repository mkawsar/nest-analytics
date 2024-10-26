import { UserService } from './user.service';
import { CommandModule } from 'nestjs-command';
import { User, UserSchema } from './user.model';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserSeeder } from './Seeders/user.seeder';
import { Module, forwardRef } from '@nestjs/common';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        forwardRef(() => AuthModule),
        CommandModule
    ],
    controllers: [UserController],
    providers: [UserService, UserSeeder],
    exports: [UserService]
})
export class UserModule {}
