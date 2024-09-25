import { JwtModule } from '@nestjs/jwt';
import { JwtStragtegy } from './JwtStrategy';
import { AuthService } from './auth.service';
import { LocalStrategy } from './localStrategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { Module, forwardRef } from '@nestjs/common';


@Module({
    imports: [
        JwtModule.register({
            secret: 'JWT_SECRET',
            signOptions: { expiresIn: '3000s' },
        }),
        forwardRef(() => UserModule),
        PassportModule,
    ],
    providers: [AuthService, JwtStragtegy, LocalStrategy],
    exports: [AuthService]
})
export class AuthModule {}
