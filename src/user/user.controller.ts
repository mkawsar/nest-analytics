import { Role } from './enums/role.enum';
import { UserService } from './user.service';
import { Roles } from 'src/auth/roles.decorator';
import { UserCreateDto } from './user.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGaurd } from 'src/auth/jwt-auth.gaurd';
import { Controller, Logger, Post, Body, HttpStatus, HttpException, Get, UseGuards } from '@nestjs/common';
import { User } from './user.model';


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

    @Get('list')
    @Roles(Role.Moderator, Role.Admin)
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGaurd)
    async list(): Promise<User[]> {
        let obj = {};
        return this.userService.find(obj);
    }
}
