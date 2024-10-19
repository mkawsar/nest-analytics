import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

@Injectable()
export class SuccessResponseIntercptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        return next.handle().pipe(
            map((data) => ({
                success: true,
                message: 'Request processed successfully',
                data,
            })),
        );
    }
}
