import { UserService } from './user.service';
import { UserCreateDto } from './user.decorator';
import { ConflictException, Controller, Logger, Post, Body } from '@nestjs/common';


@Controller('user')
export class UserController {
    logger: Logger;

    constructor(private readonly userService: UserService) {
        this.logger = new Logger(UserController.name);
    }

    @Post('create')
    async create(@Body() dto: UserCreateDto): Promise<any> {
        const newUser = dto;
        try {
            const query = { email: newUser.email };
            const isUser = await this.userService.findOne(query);
            if (isUser) {
                throw new ConflictException('User Already Exist');
            }
            const user = await this.userService.create(newUser);
            return user;
        } catch (err) {
            err;
        }
    }
}
