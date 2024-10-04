import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { ALlExceptionsFilter } from './errors/all-exceptions.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory: (errors) => {
                const result = errors.map((error) => ({
                    property: error.property,
                    message: error.constraints[Object.keys(error.constraints)[0]],
                }));
                return new BadRequestException(result);
            },
            stopAtFirstError: true,
            }),
    );
    app.setGlobalPrefix('api/v1')
    // Apply the global exception filter
    app.useGlobalFilters(new ALlExceptionsFilter());
    await app.listen(3000);
}

bootstrap();
