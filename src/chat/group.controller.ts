import { GroupCreateDto } from './group.dto';
import { GroupService } from './group.service';
import { JwtAuthGaurd } from 'src/auth/jwt-auth.gaurd';
import { Controller, Logger, Post, Get, Body, UseGuards, Request } from '@nestjs/common';

@Controller('group')
export class GroupController {
    logger: Logger;

    constructor(private readonly groupService: GroupService) {
        this.logger = new Logger(GroupController.name);
    }

    @Post('create')
    @UseGuards(JwtAuthGaurd)
    async create(@Request() req, @Body() dto: GroupCreateDto): Promise<any> {
        const obj = {
            name: '',
            admins: [],
            members: [],
            creator: ''
        };
        obj.name = dto.name;
        obj.admins.push(req.user.id);
        obj.members.push(req.user.id);
        obj.creator = req.user.id;

        const group = await this.groupService.create(obj);
        return group;
    }

    @Get('own/list')
    @UseGuards(JwtAuthGaurd)
    async getOwnGroulList(@Request() res) {
        return this.groupService.getOwnList(res.user.id);
    }
}


