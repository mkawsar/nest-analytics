import { Reflector } from '@nestjs/core';
import { Role } from 'src/user/enums/role.enum';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflactor: Reflector) {}
    

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflactor.get<Role[]>('roles', context.getHandler());
        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return requiredRoles.some((role) => user.role.includes(role));
    }
}
