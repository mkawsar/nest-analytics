import { GroupService } from './group.service';
import { Controller, Logger, Post, Body, HttpStatus, HttpException } from '@nestjs/common';

@Controller('group')
export class GroupController {
    logger: Logger;

    constructor(private readonly groupService: GroupService) {
        this.logger = new Logger(GroupController.name);
    }

    @Post('create')
    async create(): Promise<any> {
        return 'Hello world';
    }
}


