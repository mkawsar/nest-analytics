import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { JwtAuthGaurd } from 'src/auth/jwt-auth.gaurd';
import { Controller, Logger, Request, Body, UseGuards, Post } from '@nestjs/common';

@Controller('room')
export class RoomsController {
    logger: Logger;
    constructor(private readonly roomsService: RoomsService) {
        this.logger = new Logger(RoomsController.name);
    }
    
    @Post('create')
    @UseGuards(JwtAuthGaurd)
    async create(@Request() req, @Body() createRoomDto: CreateRoomDto): Promise<any> {
        try {
            return await this.roomsService.create(req.user.id.toString(), createRoomDto);
        } catch (err) {
            return err;
        }
    }
}
