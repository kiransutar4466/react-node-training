import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateVendorDto, QueryFindVendorsDto, UpdateVendorDto } from './dto/vendors.dto';
export declare class VendorsService {
    private readonly logger;
    private readonly prisma;
    constructor(logger: Logger, prisma: PrismaClient);
    create(createVendorDto: CreateVendorDto): Promise<{
        message: string;
    }>;
    findAll(queryFindVendorsDto: QueryFindVendorsDto): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateVendorDto: UpdateVendorDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
