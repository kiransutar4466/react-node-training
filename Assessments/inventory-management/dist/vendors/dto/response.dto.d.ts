import { CreateVendorDto } from './vendors.dto';
export declare class ResponseCreateVendorDto {
    message: string;
}
export declare class ResponseUpdateVendorDto {
    message: string;
}
export declare class ResponseDeleteVendorDto {
    message: string;
}
export declare class AdditionalVendorDto {
    id: string;
    createdAt: string;
    updatedAt: string;
}
declare const ResponseFindVendorDto_base: import("@nestjs/common").Type<AdditionalVendorDto & Omit<CreateVendorDto, "password">>;
export declare class ResponseFindVendorDto extends ResponseFindVendorDto_base {
}
export {};
