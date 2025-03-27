import { Logger } from '@nestjs/common';
import { CreateProductDto, QueryFindProductDto, UpdateProductDto } from './dto/products.dto';
import { PrismaClient } from '@prisma/client';
export declare class ProductsService {
    private readonly logger;
    private readonly prisma;
    constructor(logger: Logger, prisma: PrismaClient);
    create(createProductDto: CreateProductDto): Promise<{
        message: string;
    }>;
    findAll(queryFindProductDto: QueryFindProductDto): Promise<{
        id: string;
        name: string;
        description: string;
        prize: number;
        quantity: number;
        stockStatus: string;
        inventory: {
            id: string;
            name: string;
        } | null;
        categories: {
            name: string;
        }[];
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        description: string;
        prize: number;
        quantity: number;
        stockStatus: string;
        isDeleted: boolean;
        userId: string | null;
        inventoryId: string | null;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
