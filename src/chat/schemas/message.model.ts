import { User } from 'src/user/user.model';
import { Types, HydratedDocument } from 'mongoose';
import { Room } from 'src/rooms/schemas/room.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema({
    timestamps: true,
    versionKey: false
})

export class Message {
    @Prop({ required: true })
    content: string;

    @Prop({ required: true, type: Types.ObjectId, ref: User.name, autopopulate: true })
    sender_id: User;

    @Prop({ required: true, type: Types.ObjectId, ref: Room.name })
    room_id: Room;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
