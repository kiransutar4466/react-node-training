import { Logger, Module } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { VendorsController } from './vendors.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [VendorsController],
  providers: [VendorsService, Logger, PrismaClient],
})
export class VendorModule {}
