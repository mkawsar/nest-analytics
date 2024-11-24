import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { Message, MessageDocument } from './schemas/message.model';

@Injectable()
export class ChatService {
    logger: Logger;
    constructor(@InjectModel(Message.name) private readonly messageModel: Model<MessageDocument>) {
        this.logger = new Logger(ChatService.name);
    }

    async create(senderID: string, createChatDto: CreateChatDto): Promise<any> {
        const createdChat = new this.messageModel({
            ...createChatDto,
            sender_id: senderID
        });

        return await createdChat.save();
    }
}
