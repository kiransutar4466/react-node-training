import { HttpException, HttpStatus, Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService, TokenExpiredError } from "@nestjs/jwt";
import { NextFunction } from "express";

interface CustomRequest extends Request {
    user?: any; // for set req.user after token decoded
}

@Injectable()
export class AuthMiddleware implements NestMiddleware{
    private readonly logger = new Logger();
    constructor(
        private readonly configService : ConfigService,
        private readonly jwtService : JwtService
    ){}
    async use(req:CustomRequest, res: Response, next:NextFunction){
        try{
            const token = req.headers && req.headers['authorization'] && req.headers['authorization'].split("Bearer ")[1]; 
            // this.logger.debug("------------------------------------------") 
            // this.logger.debug(token) 
            // // console.log(req);
            // console.log("Request Headers : ",req.headers);
            if(!token)
            {
                this.logger.error("Token not found");
                throw new HttpException('Token not found',HttpStatus.UNAUTHORIZED);
            }

            const sec_key = this.configService.get<string>("SECRET_KEY");

            const decodedToken = await this.jwtService.verifyAsync(token,{secret:sec_key});
            // console.log(decodedToken);

            if(!decodedToken || !decodedToken.user_id){
                this.logger.warn("Invalid token");
                throw new HttpException('Invalid token',HttpStatus.FORBIDDEN);
            }else{
                req.user = decodedToken;
                this.logger.log("Token verified succesfully");
                next();
            }
        }catch(error){
            // throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
            if(error instanceof TokenExpiredError){
                this.logger.error("Token Expired");
                throw new HttpException('Token Expired',HttpStatus.UNAUTHORIZED);
            }
            this.logger.error("Error in token verification");
            throw error;
        }
    }
}