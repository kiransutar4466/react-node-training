/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { QueryFindOrdersDto } from "./dto/orders.dto";

@Injectable()
export class OrdersService {
  constructor(
    private readonly logger: Logger,
    private readonly prisma: PrismaClient,
  ) {
    this.logger = new Logger(OrdersService.name);
  }

  // create/place orders
  async create(vendorId: string) {
    try {
      // find login/buyer vendor's cart and get all the cart items
      const cart = await this.prisma.cart.findUnique({
        where: { vendorId },
        select: {
          id: true,
          cartItems: {
            select: {
              productId: true,
              quantity: true,
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  quantity: true,
                  inventoryId: true,
                },
              },
            },
          },
        },
      });

      if (!cart) {
        throw new HttpException("cart is empty", HttpStatus.BAD_REQUEST);
      }

      let totalAllOrderItemsPrice = 0;
      const orderItemsData: any = [];

      // check if stock is available for all the cart items before placing order
      for (const cartItem of cart.cartItems) {
        const { product, quantity } = cartItem;
        if (product.quantity - 5 < quantity) {
          throw new HttpException(
            `not enough stock available for ${product.name}.`,
            HttpStatus.BAD_REQUEST,
          );
        }
        // calculate total price of all the order items
        totalAllOrderItemsPrice += product.price * quantity;
        // prepare the order items data objects to push
        orderItemsData.push({
          productId: product.id,
          quantity,
          price: product.price,
          totalPrice: product.price * quantity,
          inventoryId: product.inventoryId,
        });
      }

      // place or create the order
      const order = await this.prisma.order.create({
        data: {
          buyerVendorId: vendorId,
          totalPrice: totalAllOrderItemsPrice,
          orderItems: {
            create: orderItemsData,
          },
        },
        include: { orderItems: true },
      });

      // update product stock
      for (const cartItem of cart.cartItems) {
        await this.prisma.product.update({
          where: { id: cartItem.productId },
          data: {
            quantity: { decrement: cartItem.quantity },
            soldCount: { increment: cartItem.quantity },
            stockStatus:
              cartItem.product.quantity - cartItem.quantity > 20
                ? "IN_STOCK"
                : cartItem.product.quantity - cartItem.quantity > 5
                  ? "LOW_STOCK"
                  : "OUT_OF_STOCK",
          },
        });
      }

      // delete all cart items once order is placed
      await this.prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      this.logger.debug(order);
      return { message: "orders placed successfully" };
    } catch (error) {
      this.logger.error(`Error in create | ${error}`);
      throw error;
    }
  }

  async findAll(queryFindOrdersDto: QueryFindOrdersDto, vendorId: string) {
    try {
      const { page, perPage, search } = queryFindOrdersDto;
      const where: any = {
        order: { buyerVendorId: vendorId },
        isDeleted: false,
      };
      if (search) {
        const searchQuery = {
          contains: search,
          mode: "insensitive",
        };
        where.OR = [
          { orderStatus: searchQuery },
          { paymentStatus: searchQuery },
          { quantity: searchQuery },
          { totalPrice: searchQuery },
          { product: { name: searchQuery } },
        ];
      }

      const skip = (page - 1) * perPage;

      const orderItems = await this.prisma.orderItem.findMany({
        where,
        skip,
        take: perPage,
        select: {
          id: true,
          productId: true,
          quantity: true,
          totalPrice: true,
          orderStatus: true,
          paymentStatus: true,
          product: { select: { name: true } },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const data = orderItems.map((orderItem) => {
        const { product, ...filteredOrderItem } = {
          ...orderItem,
          productName: orderItem.product.name,
        };
        return filteredOrderItem;
      });

      const totalOrderItems = await this.prisma.orderItem.count({
        where: { order: { buyerVendorId: vendorId }, isDeleted: false },
      });

      return {
        page,
        totalPages: Math.ceil(totalOrderItems / perPage),
        prev: page > 1 ? page - 1 : null,
        next: page * perPage < totalOrderItems ? page + 1 : null,
        data,
      };
    } catch (error) {
      this.logger.error(`Error in findAll | ${error}`);
      throw error;
    }
  }

  async findSingleOrderItem(
    id: string,
    vendorId: string,
    inventoryId: string,
    role: string,
  ) {
    try {
      const where: any = { id, isDeleted: false };
      if (role == "VENDOR") {
        // if login is done by VENDOR then it can be only viewed
        // by buyerVendor OR by vendor who owns the product i.e. if order item is from his/her inventory
        where.OR = [
          { inventoryId, inventory: { vendorId } },
          { order: { buyerVendorId: vendorId } },
        ];
      }

      const orderItem = await this.prisma.orderItem.findUnique({
        where,
        select: {
          id: true,
          productId: true,
          quantity: true,
          totalPrice: true,
          orderStatus: true,
          paymentStatus: true,
          product: { select: { name: true } },
        },
      });

      if (!orderItem) {
        throw new HttpException("order item not found", HttpStatus.NOT_FOUND);
      }

      const filteredOrderItem: any = {
        ...orderItem,
        productName: orderItem.product.name,
      };
      delete filteredOrderItem.product;

      return filteredOrderItem;
    } catch (error) {
      this.logger.error(`Error in findAll | ${error}`);
      throw error;
    }
  }

  // cancel order for buyerVendor
  async cancelOrderItem(id: string, vendorId: string) {
    try {
      const orderItem = await this.prisma.orderItem.findUnique({
        where: { id, order: { buyerVendorId: vendorId }, isDeleted: false },
        select: { id: true, orderStatus: true, paymentStatus: true },
      });
      if (!orderItem) {
        throw new HttpException("order item not found", HttpStatus.NOT_FOUND);
      }

      const data: any = { orderStatus: "CANCELLED" };
      if (orderItem.paymentStatus === "PENDING")
        data.paymentStatus = "CANCELLED";

      await this.prisma.orderItem.update({
        where: { id, order: { buyerVendorId: vendorId } },
        data,
      });
      return { message: "order item cancelled successfully" };
    } catch (error) {
      this.logger.error(`Error in cancelOrderItem | ${error}`);
      throw error;
    }
  }
}
