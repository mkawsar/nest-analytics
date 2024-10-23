import { RoomType } from '../enums/room-type.enum';
import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, ValidateIf } from 'class-validator';

export class CreateRoomDto {
    @IsNotEmpty()
    @ValidateIf(o => o.type != RoomType.PERSONAL)
    name: string;

    @IsArray()
    @ArrayNotEmpty()
    members: string[];

    @IsEnum(RoomType)
    @ValidateIf(o => o.type)
    type: RoomType;
}
