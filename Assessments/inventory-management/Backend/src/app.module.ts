import { Logger, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { APP_FILTER } from "@nestjs/core";
import { PrismaClient } from "@prisma/client";

import { AuthModule } from "./auth/auth.module";
import { VendorModule } from "./vendors/vendors.module";
import { ProductsModule } from "./products/products.module";
import { InventoryModule } from "./inventory/inventory.module";
import { LoginMiddleware } from "./middleware/login.middleware";
import { CategoriesModule } from "./categories/categories.module";
import { VendorsController } from "./vendors/vendors.controller";
import { ProductsController } from "./products/products.controller";
import { InventoryController } from "./inventory/inventory.controller";
import { CategoriesController } from "./categories/categories.controller";
import { CatchEverythingFilter } from "./filters/catch-everything.filter";
import { SaveCredentialsModule } from "./save-credentials/save-credentials.module";
import { CartModule } from "./cart/cart.module";
import { CartController } from "./cart/cart.controller";

@Module({
  imports: [
    AuthModule,
    VendorModule,
    ProductsModule,
    InventoryModule,
    SaveCredentialsModule,
    CategoriesModule,
    CartModule,
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
      .forRoutes(
        VendorsController,
        ProductsController,
        InventoryController,
        CategoriesController,
        CartController,
      );
  }
}
