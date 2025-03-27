"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ProductsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let ProductsService = ProductsService_1 = class ProductsService {
    logger;
    prisma;
    constructor(logger, prisma) {
        this.logger = logger;
        this.prisma = prisma;
        this.logger = new common_1.Logger(ProductsService_1.name);
    }
    async create(createProductDto) {
        try {
            this.logger.debug(createProductDto);
            if (createProductDto.quantity > 10) {
                createProductDto['stockStatus'] = 'IN_STOCK';
            }
            else if (createProductDto.quantity > 0) {
                createProductDto['stockStatus'] = 'LOW_STOCK';
            }
            await this.prisma.product.create({
                data: createProductDto,
            });
            return {
                message: 'product created successfully',
            };
        }
        catch (error) {
            this.logger.error(`Error in create product | ${error}`);
            throw error;
        }
    }
    async findAll(queryFindProductDto) {
        try {
            const { limit, category } = queryFindProductDto;
            const where = { isDeleted: false };
            if (category) {
                where['categories'] = {
                    some: {
                        name: { equals: category, mode: 'insensitive' },
                    },
                };
            }
            return this.prisma.product.findMany({
                where,
                take: limit,
                select: {
                    id: true,
                    name: true,
                    description: true,
                    prize: true,
                    quantity: true,
                    stockStatus: true,
                    inventory: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    categories: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
        }
        catch (error) {
            this.logger.error(`Error in findAll product | ${error}`);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const product = await this.prisma.product.findUnique({
                where: { id, isDeleted: false },
            });
            if (!product) {
                throw new common_1.HttpException('product not found', common_1.HttpStatus.UNAUTHORIZED);
            }
            return product;
        }
        catch (error) {
            this.logger.error(`Error in findOne product | ${error}`);
            throw error;
        }
    }
    async update(id, updateProductDto) {
        try {
            const productFound = await this.prisma.product.findUnique({
                where: { id, isDeleted: false },
                select: { isDeleted: true },
            });
            this.logger.debug(productFound);
            if (!productFound) {
                throw new common_1.HttpException('product not found', common_1.HttpStatus.UNAUTHORIZED);
            }
            if (updateProductDto.quantity && updateProductDto.quantity > 10) {
                updateProductDto['stockStatus'] = 'IN_STOCK';
            }
            else if (updateProductDto.quantity && updateProductDto.quantity > 0) {
                updateProductDto['stockStatus'] = 'LOW_STOCK';
            }
            else if ('quantity' in updateProductDto &&
                updateProductDto.quantity == 0) {
                updateProductDto['stockStatus'] = 'OUT_OF_STOCK';
            }
            await this.prisma.product.update({
                where: { id, isDeleted: false },
                data: updateProductDto,
                select: { _count: true },
            });
            return { message: 'product updated successfully' };
        }
        catch (error) {
            this.logger.error(`Error in update product | ${error}`);
            throw error;
        }
    }
    async remove(id) {
        try {
            const product = await this.prisma.product.findUnique({
                where: { id, isDeleted: false },
            });
            if (!product) {
                throw new common_1.HttpException('product not found', common_1.HttpStatus.UNAUTHORIZED);
            }
            await this.prisma.product.update({
                where: { id },
                data: {
                    isDeleted: true,
                },
            });
            return { message: 'product deleted successfully' };
        }
        catch (error) {
            this.logger.error(`Error in remove product | ${error}`);
            throw error;
        }
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = ProductsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_1.Logger,
        client_1.PrismaClient])
], ProductsService);
//# sourceMappingURL=products.service.js.map