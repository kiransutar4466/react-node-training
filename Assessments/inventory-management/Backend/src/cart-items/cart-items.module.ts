import { PrismaClient } from "@prisma/client";
import { Logger, Module } from "@nestjs/common";

import { CartItemsService } from "./cart-items.service";
import { CartItemsController } from "./cart-items.controller";

@Module({
  controllers: [CartItemsController],
  providers: [CartItemsService, PrismaClient, Logger],
})
export class CartItemsModule {}
