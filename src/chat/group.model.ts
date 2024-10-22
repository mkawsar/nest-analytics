import { User } from 'src/user/user.model';
import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true,
    versionKey: false
})
export class Group {
    @Prop({ required: true })
    name: string;

    @Prop({ type: [Types.ObjectId], ref: User.name, autopopulate: true })
    members: User[];

    @Prop({ type: [Types.ObjectId], ref: User.name })
    admins: User[];

    @Prop({ type: Types.ObjectId, ref: User.name })
    creator: Types.ObjectId;
}


export type GroupDocument = Group & Document;
export const GroupSchema = SchemaFactory.createForClass(Group);
