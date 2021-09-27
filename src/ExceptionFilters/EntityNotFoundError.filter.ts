import {
  ExceptionFilter,
  Catch,
  HttpStatus,
  ArgumentsHost,
} from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error';

@Catch(EntityNotFoundError)
export class EntityNotFoundFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = HttpStatus.NOT_FOUND;
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
