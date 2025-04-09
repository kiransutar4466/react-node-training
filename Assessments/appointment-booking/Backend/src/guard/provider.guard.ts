import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private logger: Logger) {
    this.logger = new Logger(AdminGuard.name);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.user.userRole.toLowerCase() === 'admin') {
      return true;
    }
    this.logger.error(`You are unauthorised | ${HttpStatus.FORBIDDEN}`);
    return false;
  }
}
