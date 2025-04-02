import { PrismaClient } from "@prisma/client";
import { Logger, Module } from "@nestjs/common";

import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, Logger, PrismaClient],
})
export class ProductsModule {}
