export declare class CreateProductDto {
    name: string;
    description: string;
    prize: number;
    quantity: number;
}
declare const UpdateProductDto_base: import("@nestjs/common").Type<Partial<CreateProductDto>>;
export declare class UpdateProductDto extends UpdateProductDto_base {
}
export declare class QueryFindProductDto {
    limit?: number;
    category?: string;
}
export {};
