import { Logger, Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { PrismaClient } from "@prisma/client";

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, Logger, PrismaClient],
})
export class OrdersModule {}
