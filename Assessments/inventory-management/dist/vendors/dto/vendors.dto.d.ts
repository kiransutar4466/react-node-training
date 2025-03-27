export declare class CreateVendorDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
declare const UpdateVendorDto_base: import("@nestjs/common").Type<Partial<CreateVendorDto>>;
export declare class UpdateVendorDto extends UpdateVendorDto_base {
}
export declare class QueryFindVendorsDto {
    page: number;
    perPage: number;
    email: string;
    firstName: string;
    lastName: string;
    companyName: string;
}
export {};
