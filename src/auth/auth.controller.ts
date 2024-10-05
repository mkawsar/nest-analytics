import { AuthService } from './auth.service';
import { PostLoginDto } from './auth.decorator';
import { LocalAuthGaurd } from './local-auth.gaurd';
import { Controller, Post, Logger, Request, UseGuards, Body } from '@nestjs/common';

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
            return this.authService.generateJwtToken(req.user);
        } catch (err) {
            throw err;
        }
    }
}
