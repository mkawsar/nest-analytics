import { LocalAuthGaurd } from './local-auth.gaurd';
import { Controller, Post, Logger, Request, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    logger: Logger;
    constructor() {
        this.logger = new Logger(AuthController.name);
    }

    @Post('login')
    @UseGuards(LocalAuthGaurd)
    async login(@Request() req): Promise<any> {
        try {
            return req.user;
        } catch (err) {
            throw err;
        }
    }
    
}
