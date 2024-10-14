import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { AuthService } from './auth.service';
import { PostLoginDto } from './auth.decorator';
import { JwtAuthGaurd } from './jwt-auth.gaurd';
import { Role } from 'src/user/enums/role.enum';
import { LocalAuthGaurd } from './local-auth.gaurd';
import { Controller, Post, Logger, Request, UseGuards, Body, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    logger: Logger;
    constructor(private readonly authService: AuthService) {
        this.logger = new Logger(AuthController.name);
    }

    @Post('login')
    @UseGuards(LocalAuthGaurd)
    async login(@Request() req, @Body() dto: PostLoginDto): Promise<any> {
        try {
            return this.authService.generateJwtToken(dto);
        } catch (err) {
            throw err;
        }
    }

    @Get('view/profile')
    @Roles(Role.Admin, Role.User, Role.Moderator)
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGaurd)
    async getAuthUserProfile(@Request() req): Promise<any> {
        return req.user;
    }
}
