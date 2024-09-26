import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private UserService: UserService,
        private jwtService: JwtService
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

    async validateUser(email: string, pass: string): Promise<any> {
        const query = {email: email};
        const user = await this.UserService.findOne(query);
        if (!user) throw new NotFoundException('Email Does not exist');
        const isMatched = this.comparedPassword(pass, user?.password);
        if (!isMatched) throw new UnauthorizedException('Invalid Password');
        return user;
    }

    // Compared password
    async comparedPassword(password: string, hashedPassword: string): Promise<any>{
        return bcrypt
            .compare(password, hashedPassword)
            .then((isMatched: any) => {
                if (isMatched) return true;
                return false;
            }).catch((err: any) => {
                err;
            });
    }

    async generateJwtToken(user: any) {
        const payload = {
            email: user.email
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
