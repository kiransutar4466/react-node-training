/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
  Logger,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request, Response, NextFunction } from "express";

import { PrismaClient } from "@prisma/client";

@Injectable()
export class LoginMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaClient,
    private logger: Logger,
  ) {
    this.logger = new Logger(LoginMiddleware.name);
  }

  async use(req: Request, _res: Response, next: NextFunction) {
    try {
      this.logger.debug("LoginMiddleware Triggered!");
      const token = req.headers.authorization?.split("Bearer ")[1];
      this.logger.debug(`token | ${token}`);
      if (!token) {
        throw new HttpException("token not provided", HttpStatus.BAD_REQUEST);
      }

      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
      const foundUser = await this.prisma.vendor.findUnique({
        where: {
          email: decoded.email,
        },
      });
      if (!foundUser) {
        throw new HttpException("invalid token", HttpStatus.BAD_REQUEST);
      }
      this.logger.verbose(decoded);
      req["decoded"] = decoded;
      next();
    } catch (error) {
      this.logger.error(error.message);
      switch (error.message) {
        case "jwt malformed":
          throw new HttpException("jwt malformed", HttpStatus.BAD_REQUEST);
        case "invalid token":
          throw new HttpException("invalid token", HttpStatus.BAD_REQUEST);
        case "jwt expired":
          throw new HttpException("jwt expired", HttpStatus.BAD_REQUEST);
        default:
          throw error;
      }
    }
  }
}
