import { VendorsService } from './vendors.service';
import { CreateVendorDto, UpdateVendorDto, QueryFindVendorsDto } from './dto/vendors.dto';
export declare class VendorsController {
    private readonly vendorsService;
    constructor(vendorsService: VendorsService);
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
