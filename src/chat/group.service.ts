import { Model } from 'mongoose';
import { Group } from './group.model';;
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class GroupService {
    constructor(
        @InjectModel(Group.name) private groupModel: Model<Group>
    ) { }

    
}