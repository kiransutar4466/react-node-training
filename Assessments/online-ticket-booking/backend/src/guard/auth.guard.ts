import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{
    private readonly logger = new Logger();
    constructor(
        private readonly reflector : Reflector
    ){}

    canActivate(context: ExecutionContext): boolean {
        try{
            const request = context.switchToHttp().getRequest();
            const requireRoles = this.reflector.get('userRoles',context.getHandler()) || this.reflector.get('userRoles',context.getClass());

            const presentUserRole = request.user.role;

            if(!requireRoles.includes(presentUserRole)){
                this.logger.warn("Access denied due to role mismatching");
                throw new HttpException('Access denied : Role Mismatch',HttpStatus.FORBIDDEN);
            }
            this.logger.log("Role checked..!!");
            return true;
        }catch(error){
            this.logger.error("Error for user role");
            throw error;
        }
    }
}