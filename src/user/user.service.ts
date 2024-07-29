import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserService {
    logger: Logger
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
        this.logger = new Logger(UserService.name);
    }
}
