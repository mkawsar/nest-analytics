import { UserService } from './user.service';
import { UserCreateDto } from './user.decorator';
import { Controller, Logger, Post, Body, HttpStatus, HttpException } from '@nestjs/common';


@Controller('user')
export class UserController {
    logger: Logger;

    constructor(private readonly userService: UserService) {
        this.logger = new Logger(UserController.name);
    }

    @Post('create')
    async create(@Body() dto: UserCreateDto): Promise<any> {
        try {
            const user = await this.userService.create(dto);
            return user;
        } catch (err) {
            throw new HttpException({
                message: 'User already exist'
            }, HttpStatus.BAD_REQUEST);
        }
    }
}
