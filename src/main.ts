import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const appOptions = {cors: true};
    const app = await NestFactory.create(AppModule, appOptions);
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}

bootstrap();
