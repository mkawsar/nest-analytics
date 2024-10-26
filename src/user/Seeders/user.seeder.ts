import { faker } from '@faker-js/faker';
import { UserService } from '../user.service';
import { Injectable, Logger, forwardRef, Inject } from '@nestjs/common';
import { Command, Positional } from 'nestjs-command';
import { User } from '../user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserSeeder {
    logger: Logger;
    constructor(
        @Inject(forwardRef(() => AuthService)) private AuthService: AuthService,
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private readonly userService: UserService) {
        this.logger = new Logger(UserSeeder.name);
    }

    @Command({ command: 'seed:user', describe: 'Seed user table' })
    async seed() {
        for (let i = 1; i <= 50; i++) {
            const roles = ['admin', 'moderator', 'user'];
            const random = Math.floor(Math.random() * roles.length);
            let obj = {
                name: faker.person.fullName(),
                username: faker.internet.userName().toLowerCase(),
                email : faker.internet.email().toLowerCase(),
                role: roles[random],
                password: await this.AuthService.getHashedPassword('123456')
            };
            const newUser = new this.userModel(obj);
            await newUser.save();
            console.log('completed');
        }
    }
}
