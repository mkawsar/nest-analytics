import { IsNotEmpty, IsString } from 'class-validator';

export class GroupCreateDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}
