import { Logger, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { APP_FILTER } from "@nestjs/core";
import { PrismaClient } from "@prisma/client";

import { AuthModule } from "./auth/auth.module";
import { VendorModule } from "./vendors/vendors.module";
import { OrdersModule } from "./orders/orders.module";
import { ProductsModule } from "./products/products.module";
import { CartItemsModule } from "./cart-items/cart-items.module";
import { InventoryModule } from "./inventory/inventory.module";
import { LoginMiddleware } from "./middleware/login.middleware";
import { CategoriesModule } from "./categories/categories.module";
import { OrdersController } from "./orders/orders.controller";
import { VendorsController } from "./vendors/vendors.controller";
import { ProductsController } from "./products/products.controller";
import { CartItemsController } from "./cart-items/cart-items.controller";
import { InventoryController } from "./inventory/inventory.controller";
import { CategoriesController } from "./categories/categories.controller";
import { CatchEverythingFilter } from "./filters/catch-everything.filter";
import { SaveCredentialsModule } from "./save-credentials/save-credentials.module";

@Module({
  imports: [
    AuthModule,
    VendorModule,
    ProductsModule,
    InventoryModule,
    CategoriesModule,
    CartItemsModule,
    OrdersModule,
    SaveCredentialsModule,
  ],
  controllers: [],
  providers: [
    Logger,
    JwtService,
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
        OrdersController,
        VendorsController,
        ProductsController,
        CartItemsController,
        InventoryController,
        CategoriesController,
      );
  }
}
