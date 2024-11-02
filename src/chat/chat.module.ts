import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatController } from './chat.controller';
import { Message, MessageSchema } from './schemas/message.model';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    ],
    controllers: [ChatController],
    providers: [ChatService],
})
export class ChatModule {}
