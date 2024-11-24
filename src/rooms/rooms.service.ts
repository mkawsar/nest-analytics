import { Model } from 'mongoose';
import { Room } from './schemas/room.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomsService {
    constructor(
        @InjectModel(Room.name) private readonly roomModel: Model<Room>
    ) { }
    
    async create(userID: string, createRoomDto: CreateRoomDto) {
        createRoomDto.members.push(userID);
        const room = '';
    }
}
