import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { AuthService } from '../auth/auth.service';
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserService {
    logger: Logger
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @Inject(forwardRef(() => AuthService)) private AuthService: AuthService
    ) {
        this.logger = new Logger(UserService.name);
    }

    async findOne(query: any) {
        return await this.userModel.findOne(query).select('-password');
    }

    async find(usersFilterQuery: FilterQuery<User>): Promise<User[]> {
        return this.userModel.find({ usersFilterQuery });
    }

    async create(user: any): Promise<any> {
        if (user.facebookId || user.googleId) return this.userModel.create(user);
        const hashedPassword = await this.AuthService.getHashedPassword(user.password);
        user.password = hashedPassword;
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    async findOneAndUpdate(query: any, payload: any): Promise<User> {
        this.logger.log('Updating User.');
        return this.userModel.findOneAndUpdate(query, payload, {
            new: true,
            upsert: true,
        });
    }
    
    async findOneAndRemove(query: any): Promise<any> {
        return this.userModel.findByIdAndDelete(query);
    }
}
