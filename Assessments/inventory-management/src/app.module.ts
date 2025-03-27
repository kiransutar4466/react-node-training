import { Logger, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

import { AuthModule } from './auth/auth.module';
import { VendorModule } from './vendors/vendors.module';
import { ProductsModule } from './products/products.module';
import { InventoryModule } from './inventory/inventory.module';
import { APP_FILTER } from '@nestjs/core';
import { CatchEverythingFilter } from './filters/catch-everything.filter';

@Module({
  imports: [AuthModule, VendorModule, ProductsModule, InventoryModule],
  controllers: [],
  providers: [
    JwtService,
    Logger,
    PrismaClient,
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter,
    },
  ],
})
export class AppModule {}
