import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { AllExceptionsFilter } from './errors/all-exceptions.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
    .setTitle('Nest Scratch')
    .setDescription('Trying to build new things')
    .setVersion('1.0')
    .addTag('APIs')
    .build();

    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT') || 3000;

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
    app.useGlobalFilters(new AllExceptionsFilter());
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);
    await app.listen(port);
}

bootstrap();
