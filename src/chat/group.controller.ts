import { GroupCreateDto } from './group.dto';
import { GroupService } from './group.service';
import { JwtAuthGaurd } from 'src/auth/jwt-auth.gaurd';
import { Controller, Logger, Post, Body, HttpStatus, HttpException, UseGuards } from '@nestjs/common';

@Controller('group')
export class GroupController {
    logger: Logger;

    constructor(private readonly groupService: GroupService) {
        this.logger = new Logger(GroupController.name);
    }

    @Post('create')
    @UseGuards(JwtAuthGaurd)
    async create(@Body() dto: GroupCreateDto): Promise<any> {
        return dto;
    }
}


