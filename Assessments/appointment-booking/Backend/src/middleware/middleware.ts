import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private logger: Logger,
  ) {
    this.logger = new Logger(UserMiddleware.name);
  }

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token =
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split('Bearer ')[1];
      if (!token) {
        this.logger.log(`UserMiddleware Token: ${token}`);        
        throw new HttpException('Token not found', HttpStatus.BAD_REQUEST);
      }
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRETKEY,
      });
     
      const findUser = await prisma.provider.findUnique({
        where: {
          email: payload.userEmail,
        },
      });

      if (!findUser) {
        throw new HttpException(
          'You are not Authorized',
          HttpStatus.UNAUTHORIZED,
        );
      }
      req.user = payload;
      this.logger.log(`req.user: ${JSON.stringify(req.user)}`);   
      next();
    } catch (error) {
      if (error.message === 'invalid signature') {
        this.logger.error(
          `Invalid Token${HttpStatus.BAD_REQUEST} | BAD_REQUEST`,
        );
        throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
      }
      if (error.message === 'jwt expired') {
        this.logger.error(
          `Token expired  ${HttpStatus.UNAUTHORIZED} | Unauthorized`,
        );
        throw new HttpException('Token expired', HttpStatus.UNAUTHORIZED);
      }
      if (error.message === 'Token not found') {
        this.logger.error(
          `Token not found  ${HttpStatus.BAD_REQUEST} | BAD_REQUEST`,
        );
        throw new HttpException('Token not found', HttpStatus.BAD_REQUEST);
      }
      this.logger.error(`${error}`);
      throw error;
    }
  }
}
