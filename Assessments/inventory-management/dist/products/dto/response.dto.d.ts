import { CreateProductDto } from './products.dto';
export declare class ResponseCreateProductDto {
    message: string;
}
export declare class ResponseUpdateProductDto {
    message: string;
}
export declare class ResponseDeleteProductDto {
    message: string;
}
export declare class AdditionalProductDto {
    id: string;
    createdAt: string;
    updatedAt: string;
}
declare const ResponseFindProductDto_base: import("@nestjs/common").Type<CreateProductDto & AdditionalProductDto>;
export declare class ResponseFindProductDto extends ResponseFindProductDto_base {
}
export {};
