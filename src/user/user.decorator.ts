import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

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
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}
