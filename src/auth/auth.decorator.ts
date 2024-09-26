import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class PostLoginDto {
    @IsNotEmpty()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}
