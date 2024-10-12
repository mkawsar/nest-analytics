import { Role } from './enums/role.enum';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum } from 'class-validator';

export class UserCreateDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsEnum(Role)
    role: string

    @IsNotEmpty()
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}
