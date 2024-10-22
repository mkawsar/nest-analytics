import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsController } from './rooms.controller';
import { Room, RoomSchema } from './schemas/room.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Room.name, schema: RoomSchema}
        ])
    ],
    controllers: [RoomsController],
    providers: [RoomsService],
})
export class RoomsModule {}
