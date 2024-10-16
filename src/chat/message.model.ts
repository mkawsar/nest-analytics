import { User } from 'src/user/user.model';
import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Message {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    sender: User;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    receiver: User; // For private messages

    @Prop({ type: Types.ObjectId, ref: 'Group' })
    group: Types.ObjectId; // For group messages

    @Prop({ required: true })
    message: string;

    @Prop({ default: Date.now })
    timestamp: Date;
}

export type MessageDocument = Message & Document;
export const MessageSchema = SchemaFactory.createForClass(Message);
