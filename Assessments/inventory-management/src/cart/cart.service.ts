/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CreateCartItemDto, QueryFindCartItemDto } from "./dto/cart.dto";

@Injectable()
export class CartService {
  constructor(
    private readonly logger: Logger,
    private readonly prisma: PrismaClient,
  ) {
    this.logger = new Logger(CartService.name);
  }

  async create(createCartItemDto: CreateCartItemDto, vendorId: string) {
    try {
      this.logger.debug(
        `createCartItemDto | ${JSON.stringify(createCartItemDto)}`,
      );
      const { productId, quantity } = createCartItemDto;

      // check if product exists or not
      const product = await this.prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product || product.isDeleted) {
        throw new HttpException("product not found", HttpStatus.BAD_REQUEST);
      }
      if (product.quantity < quantity) {
        throw new HttpException(
          "not enough stock available",
          HttpStatus.BAD_REQUEST,
        );
      }

      // check if product is already in the cart
      const cart = await this.prisma.cart.findUnique({
        where: { vendorId },
        select: {
          id: true,
          cartItems: true,
        },
      });
      const existingCartItem = cart!.cartItems.find(
        (cartItem) => cartItem.productId === productId,
      );

      if (existingCartItem) {
        await this.prisma.cartItem.update({
          where: { id: existingCartItem.id },
          data: { quantity: existingCartItem.quantity + quantity },
        });
      } else {
        await this.prisma.cartItem.create({
          data: {
            cartId: cart!.id,
            productId,
            quantity,
          },
        });
      }

      return { message: "cart item created successfully" };
    } catch (error) {
      this.logger.error(`Error in create | ${error}`);
      throw error;
    }
  }

  async findAll(queryFindCartItemDto: QueryFindCartItemDto, vendorId: string) {
    try {
      const { page, perPage, quantity } = queryFindCartItemDto;
      const where = { cart: { vendorId } };
      if (quantity) where["quantity"] = quantity;

      const skip = (page - 1) * perPage;
      const rawData = await this.prisma.cartItem.findMany({
        where,
        skip,
        take: perPage,
        select: {
          id: true,
          productId: true,
          quantity: true,
          product: {
            select: {
              name: true,
              price: true,
            },
          },
        },
      });

      const data = rawData.map((cartItem) => {
        const { product, ...filteredCartItem } = {
          ...cartItem,
          productName: cartItem.product.name,
          productPrice: cartItem.product.price,
        };
        return filteredCartItem;
      });

      const allProductsPriceWithQuantity = await this.prisma.cartItem.findMany({
        where: { cart: { vendorId } },
        select: {
          quantity: true,
          product: {
            select: {
              price: true,
            },
          },
        },
      });
      const totalPrice: number = allProductsPriceWithQuantity.reduce(
        (accumulator, currentObj) =>
          accumulator + currentObj.quantity * currentObj.product.price,
        0,
      );

      const totalCount = allProductsPriceWithQuantity.length;
      const totalPages = Math.ceil(totalCount / perPage);
      const prev = page > 1 ? page - 1 : null;
      const next = page < totalPages ? page + 1 : null;

      return { page, totalPages, prev, next, totalPrice, data };
    } catch (error) {
      this.logger.error(`Error in findAll | ${error}`);
      throw error;
    }
  }

  async findOne(id: string, vendorId: string) {
    try {
      const cartItem = await this.prisma.cartItem.findUnique({
        where: { id, cart: { vendorId } },
        select: {
          id: true,
          productId: true,
          quantity: true,
          product: {
            select: {
              name: true,
              price: true,
            },
          },
        },
      });
      if (!cartItem) {
        throw new HttpException("cart item not found", HttpStatus.BAD_REQUEST);
      }

      const { product, ...filteredCartItem } = {
        ...cartItem,
        productName: cartItem.product.name,
        productPrice: cartItem.product.price,
      };
      return filteredCartItem;
    } catch (error) {
      this.logger.error(`Error in findOne | ${error}`);
      throw error;
    }
  }

  async remove(id: string, vendorId: string) {
    try {
      const cartItem = await this.prisma.cartItem.findUnique({
        where: { id, cart: { vendorId } },
      });
      if (!cartItem) {
        throw new HttpException("cart item not found", HttpStatus.BAD_REQUEST);
      }
      await this.prisma.cartItem.delete({
        where: { id },
      });
      return { message: "cart item deleted successfully" };
    } catch (error) {
      this.logger.error(`Error in remove | ${error}`);
      throw error;
    }
  }
}
