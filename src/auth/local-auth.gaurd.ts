import { AuthGuard } from '@nestjs/passport';
import { Injectable, HttpException } from '@nestjs/common';


@Injectable()
export class LocalAuthGaurd extends AuthGuard('local') {
    handleRequest(err: any, user: any, info: any, context: any, status?: any) {
        if (err || !user) {
            throw new HttpException(err.message, err.status);
        }
        return user;
    }
}
