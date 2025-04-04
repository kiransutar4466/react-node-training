/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import {
  CreateCartItemDto,
  QueryFindCartItemDto,
  UpdateCartItemDto,
} from "./dto/cart-items.dto";

@Injectable()
export class CartItemsService {
  constructor(
    private readonly logger: Logger,
    private readonly prisma: PrismaClient,
  ) {
    this.logger = new Logger(CartItemsService.name);
  }

  async create(createCartItemDto: CreateCartItemDto, vendorId: string) {
    try {
      this.logger.debug(
        `createCartItemDto | ${JSON.stringify(createCartItemDto)}`,
      );
      const { productId, quantity } = createCartItemDto;

      // check if product exists or not
      // also check if vendor is not adding his/her own inventory product to the cart
      const product = await this.prisma.product.findUnique({
        where: {
          id: productId,
          inventory: { NOT: { vendorId } },
          isDeleted: false,
        },
      });
      this.logger.warn(product);
      if (!product) {
        throw new HttpException(
          "cannot order your own product or product not found ",
          HttpStatus.BAD_REQUEST,
        );
      }

      if (product.quantity - 5 < quantity) {
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
      if (cart) {
        const isExistingCartItem = cart.cartItems.find(
          (cartItem) => cartItem.productId === productId,
        );
        if (isExistingCartItem) {
          throw new HttpException(
            "product already exists in cart",
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      // find cart id
      const cartId = await this.prisma.cart.findUnique({
        where: { vendorId },
        select: { id: true },
      });
      await this.prisma.cartItem.create({
        data: {
          cartId: cartId!.id,
          productId,
          quantity,
        },
      });

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
              description: true,
            },
          },
        },
      });

      const data = rawData.map((cartItem) => {
        const { product, ...filteredCartItem } = {
          ...cartItem,
          productName: cartItem.product.name,
          productPrice: cartItem.product.price,
          productDescription: cartItem.product.description,
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

  async update(
    id: string,
    updateCartItemDto: UpdateCartItemDto,
    vendorId: string,
  ) {
    try {
      const { quantity } = updateCartItemDto;
      // check if cart item exists in the login vendor's cart
      const cartItem = await this.prisma.cartItem.findUnique({
        where: { id, cart: { vendorId } },
      });
      if (!cartItem) {
        throw new HttpException("cart item not found", HttpStatus.BAD_REQUEST);
      }

      // check if product exists or not
      const product = await this.prisma.product.findUnique({
        where: { id: cartItem.productId, isDeleted: false },
      });
      if (!product) {
        throw new HttpException("product not found", HttpStatus.BAD_REQUEST);
      }
      // check if stock is available for provided quantity
      if (product.quantity - 5 < quantity) {
        throw new HttpException(
          "not enough stock available",
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.prisma.cartItem.update({
        where: { id },
        data: { quantity },
      });

      return { message: "cart item updated successfully" };
    } catch (error) {
      this.logger.error(`Error in update | ${error}`);
      throw error;
    }
  }

  async removeAll(vendorId: string) {
    try {
      const cart = await this.prisma.cart.findUnique({
        where: { vendorId },
        select: {
          cartItems: true,
        },
      });
      if (!cart?.cartItems) {
        throw new HttpException("cart items not found", HttpStatus.BAD_REQUEST);
      }

      await this.prisma.cartItem.deleteMany({
        where: { cart: { vendorId } },
      });

      return { message: "all cart items deleted successfully" };
    } catch (error) {
      this.logger.error(`Error in remove | ${error}`);
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
