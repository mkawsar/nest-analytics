import { CreateRoomDto } from './dto/create-room.dto';
import { RoomsService } from './rooms.service';
import { Controller, Logger, Request, Body } from '@nestjs/common';

@Controller('rooms')
export class RoomsController {
    logger: Logger;
    constructor(private readonly roomsService: RoomsService) {
        this.logger = new Logger(RoomsController.name);
    }
    
    async create(@Request() req, @Body() createRoomDto: CreateRoomDto) {
        // return this.roomsService.
    }
}
