import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { AuthService } from '../auth/auth.service';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserService {
    logger: Logger
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @Inject(forwardRef(() => AuthService)) private AuthService: AuthService,
        private readonly configService: ConfigService
    ) {
        this.logger = new Logger(UserService.name);
    }

    async findOne(query: any) {
        return await this.userModel.findOne(query).select('-password');
    }

    async find(paginationDto: PaginationDto) {
        const { search } = paginationDto;
        const page = Number(paginationDto.page);
        const limit = Number(paginationDto.limit);
        const skip = (page - 1) * limit;
        const filter = search
            ? {
                $or: [
                    { name: new RegExp(search, 'i') },
                    { email: new RegExp(search, 'i') }
                ],
            }
            : {};
        const url = `${this.configService.get<string>('URL')}/api/v1/user/list`;

        const users = await this.userModel
            .find(filter)
            .sort({ name: 1 })
            .skip(skip)
            .limit(limit)
            .exec();
        const total = await this.userModel.countDocuments(filter);
        const totalPages = Math.ceil(total / limit);
        const nextPage = page < totalPages ? `${url}?page=${page + 1}&limit=${limit}` : null;
        const prevPage = page > 1 ? `${url}?page=${page - 1}&limit=${limit}` : null;
        return {
            total,
            page,
            limit,
            totalPages,
            users,
            nextPage,
            prevPage,
        }
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
