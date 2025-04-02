import { Logger, Module } from "@nestjs/common";
import { VendorsService } from "./vendors.service";
import { VendorsController } from "./vendors.controller";
import { PrismaClient } from "@prisma/client";
import { SaveCredentialsService } from "src/save-credentials/save-credentials.service";

@Module({
  controllers: [VendorsController],
  providers: [VendorsService, Logger, PrismaClient, SaveCredentialsService],
})
export class VendorModule {}
