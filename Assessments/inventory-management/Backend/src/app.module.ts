import { Logger, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { APP_FILTER } from "@nestjs/core";
import { PrismaClient } from "@prisma/client";

import { AuthModule } from "./auth/auth.module";
import { VendorModule } from "./vendors/vendors.module";
import { OrdersModule } from "./orders/orders.module";
import { ProductsModule } from "./products/products.module";
import { CartItemsModule } from "./cartItems/cartItems.module";
import { InventoryModule } from "./inventory/inventory.module";
import { LoginMiddleware } from "./middleware/login.middleware";
import { DashboardModule } from "./dashboard/dashboard.module";
import { CategoriesModule } from "./categories/categories.module";
import { OrdersController } from "./orders/orders.controller";
import { VendorsController } from "./vendors/vendors.controller";
import { ProductsController } from "./products/products.controller";
import { CartItemsController } from "./cartItems/cartItems.controller";
import { InventoryController } from "./inventory/inventory.controller";
import { DashboardController } from "./dashboard/dashboard.controller";
import { CategoriesController } from "./categories/categories.controller";
import { CatchEverythingFilter } from "./filters/catch-everything.filter";

@Module({
  imports: [
    AuthModule,
    VendorModule,
    ProductsModule,
    InventoryModule,
    CategoriesModule,
    CartItemsModule,
    OrdersModule,
    DashboardModule,
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
        DashboardController,
      );
  }
}
