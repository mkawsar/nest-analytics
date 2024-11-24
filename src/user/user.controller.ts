import { Role } from './enums/role.enum';
import { UserService } from './user.service';
import { Roles } from 'src/auth/roles.decorator';
import { UserCreateDto } from './user.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGaurd } from 'src/auth/jwt-auth.gaurd';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { Controller, Logger, Post, Body, HttpStatus, HttpException, Get, UseGuards, Query } from '@nestjs/common';


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
    async list(@Query() paginationDto: PaginationDto) {
        try {
            return this.userService.find(paginationDto);
        } catch(err) {
            console.log(err);
            return err;
        }
    }
}
