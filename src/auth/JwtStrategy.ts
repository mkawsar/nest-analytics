import { UserService } from '../user/user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class JwtStragtegy extends PassportStrategy(Strategy) {
    logger: Logger;
    email: '';

    constructor(@Inject(forwardRef(() => UserService))
    private readonly UserService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'JWT_SECRET',
        });
        this.logger = new Logger(JwtStragtegy.name);
    }

    async validate(payload: JwtStragtegy) {
        return this.UserService.findOne({ email: payload?.email });
    }
}
