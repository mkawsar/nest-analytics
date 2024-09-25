import { Module, forwardRef } from '@nestjs/common';
import { User, UserSchema } from './user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        forwardRef(() => AuthModule),
      ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
