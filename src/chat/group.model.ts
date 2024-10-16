import { User } from 'src/user/user.model';
import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Group {
    @Prop({ required: true })
    name: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
    members: User[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
    admins: User[];
}


export type GroupDocument = Group & Document;
export const GroupSchema = SchemaFactory.createForClass(Group);
