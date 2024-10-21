import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Group, GroupDocument } from './group.model';

@Injectable()
export class GroupService {
    constructor(
        @InjectModel(Group.name) private readonly groupModel: Model<GroupDocument>
    ) { }

    async create(dto: any): Promise<any> {
        const group = new this.groupModel(dto);
        return group.save();
    }

    async getOwnList(userID: string): Promise<Group[]> {
        return await this.groupModel.find().populate('creator', 'name').populate('members').exec();
    }
}