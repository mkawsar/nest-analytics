import { Model } from 'mongoose';
import { Group } from './group.model';;
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/user.model';

@Injectable()
export class GroupService {
    constructor(
        @InjectModel(Group.name) private groupModel: Model<Group>,
        @InjectModel(User.name) private userModel: Model<User>
    ) { }

    async create(dto: any): Promise<any> {
        const group = new this.groupModel(dto);
        return group.save();
    }

    async getOwnList(userID: string): Promise<Group[]> {
        // const groups = await this.groupModel.find().where('members').in([userID]).populate("members").exec();
        return this.groupModel.find().populate('admins').exec();;
    }
}