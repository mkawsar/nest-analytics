import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { GroupService } from './group.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatController } from './chat.controller';
import { Group, GroupSchema } from './group.model';
import { GroupController } from './group.controller';
import { Message, MessageSchema } from './message.model';
import { User, UserSchema } from 'src/user/user.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Group.name, schema: GroupSchema},
            { name: Message.name, schema: MessageSchema },
            {name: User.name, schema: UserSchema}
        ])
    ],
    controllers: [ChatController, GroupController],
    providers: [ChatService, GroupService],
})
export class ChatModule {}
