import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private UserService: UserService
    )
    {

    }

    async getHashedPassword(password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err: any, hash: any) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    }
}
