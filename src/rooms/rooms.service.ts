import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Room } from './schemas/room.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RoomsService {
    constructor(
        @InjectModel(Room.name) private readonly roomModel: Model<Room>
    ) {}
}
