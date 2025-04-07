import { PrismaClient } from "@prisma/client";
import { Logger, Module } from "@nestjs/common";

import { CartItemsService } from "./cartItems.service";
import { CartItemsController } from "./cartItems.controller";

@Module({
  controllers: [CartItemsController],
  providers: [CartItemsService, PrismaClient, Logger],
})
export class CartItemsModule {}
