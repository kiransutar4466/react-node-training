import { Logger, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaClient } from "@prisma/client";
import { APP_FILTER } from "@nestjs/core";

import { AuthModule } from "./auth/auth.module";
import { VendorModule } from "./vendors/vendors.module";
import { ProductsModule } from "./products/products.module";
import { InventoryModule } from "./inventory/inventory.module";
import { LoginMiddleware } from "./middleware/login.middleware";
import { CategoriesModule } from "./categories/categories.module";
import { VendorsController } from "./vendors/vendors.controller";
import { ProductsController } from "./products/products.controller";
import { CatchEverythingFilter } from "./filters/catch-everything.filter";
import { SaveCredentialsModule } from "./save-credentials/save-credentials.module";

@Module({
  imports: [
    AuthModule,
    VendorModule,
    ProductsModule,
    InventoryModule,
    SaveCredentialsModule,
    CategoriesModule,
  ],
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoginMiddleware)
      .exclude("auth/login")
      .forRoutes(VendorsController, ProductsController);
  }
}
