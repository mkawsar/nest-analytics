import { Response, Request } from 'express';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';


@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        console.log('err' ,exception);
        
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const errorResponse = {
            status: status,
            message: exception.message,
            error: exception instanceof HttpException ? exception.name : 'InternalServerError',
            timestamp: new Date().toDateString(),
            path: request.url
        };

        response.status(status).json(errorResponse);
    }
}
