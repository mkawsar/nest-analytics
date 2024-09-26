import { AuthGuard } from '@nestjs/passport';
import { Injectable, HttpException, ExecutionContext } from '@nestjs/common';


@Injectable()
export class LocalAuthGaurd extends AuthGuard('local') {
    handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
        console.log(context);
        if (err || !user) {
            throw new HttpException(err?.message, err?.status);
        }
        return user;
    }
}
