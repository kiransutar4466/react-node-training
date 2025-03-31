/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { Request } from "express";

@Injectable()
export class VendorExistsGuard implements CanActivate {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly logger: Logger,
  ) {
    this.logger = new Logger(VendorExistsGuard.name);
  }

  async canActivate(context: ExecutionContext) {
    this.logger.debug(`VendorExistsGuard triggered`);
    const request: Request = context.switchToHttp().getRequest();
    const vendorId = request.params.id || request.body.id;
    if (!vendorId) {
      throw new HttpException("vendor id is required", HttpStatus.UNAUTHORIZED);
    }
    const vendor = await this.prisma.vendor.findUnique({
      where: { id: vendorId, isDeleted: false },
    });
    if (!vendor) {
      throw new HttpException("vendor not found", HttpStatus.UNAUTHORIZED);
    }
    request["vendor"] = vendor;
    return true;
  }
}
