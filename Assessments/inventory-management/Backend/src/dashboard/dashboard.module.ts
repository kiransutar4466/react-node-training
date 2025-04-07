import { Logger, Module } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

import { DashboardService } from "./dashboard.service";
import { DashboardController } from "./dashboard.controller";

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, Logger, PrismaClient],
})
export class DashboardModule {}
