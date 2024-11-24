import * as bcrypt from 'bcrypt';
import { HydratedDocument } from 'mongoose';
import { Role } from './enums/role.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true,
    versionKey: false
})
export class User {
    @Prop({ required: true })
    name: string;
    
    @Prop({required: true, unique: true})
    email: string;

    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ enum: Role, default: Role.User })
    role: Role;

    @Prop({ required: true, select: false })
    password: string;

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password)
    }
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
