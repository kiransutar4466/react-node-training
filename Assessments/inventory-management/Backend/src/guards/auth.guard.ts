/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly logger: Logger) {
    this.logger = new Logger(AuthGuard.name);
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.debug("AuthGuard Triggered!");
    const request = context.switchToHttp().getRequest();
    this.logger.debug(request.params);
    if (
      request.decoded.role === "ADMIN" ||
      request.decoded.id === request.params.id
    ) {
      return true;
    }

    return false;
  }
}
