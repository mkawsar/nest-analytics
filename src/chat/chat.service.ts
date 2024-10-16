import { Model } from 'mongoose';
import { Group } from './group.model';
import { Message } from './message.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Message.name) private messageModel: Model<Message>,
        @InjectModel(Group.name) private groupModel: Model<Group>
    ) { }
}
