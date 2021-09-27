import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EntityNotFoundFilter } from './ExceptionFilters/EntityNotFoundError.filter';
import { HttpExceptionFilter } from './ExceptionFilters/httpException.filter';
import { ValidationExceptionFilter } from './ExceptionFilters/ValidationError.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new EntityNotFoundFilter(),
    new HttpExceptionFilter(),
    new ValidationExceptionFilter(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
