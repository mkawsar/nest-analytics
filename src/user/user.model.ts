import * as bcrypt from 'bcrypt';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
    @Prop({ required: true })
    name: string;
    
    @Prop({required: true, unique: true})
    email: string;

    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true, select: false })
    password: string;

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password)
    }
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
