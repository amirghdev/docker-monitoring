require('dotenv').config();
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request: Request = context.switchToHttp().getRequest();
      const apiKey = request.headers['x-api-key'];

      if (!apiKey) {
        throw new HttpException('enter x-api-key header', 400);
      }

      if (process.env.API_KEY !== apiKey) {
        return false;
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}
