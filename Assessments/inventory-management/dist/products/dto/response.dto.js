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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseFindProductDto = exports.AdditionalProductDto = exports.ResponseDeleteProductDto = exports.ResponseUpdateProductDto = exports.ResponseCreateProductDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const products_dto_1 = require("./products.dto");
class ResponseCreateProductDto {
    message;
}
exports.ResponseCreateProductDto = ResponseCreateProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'product created successfully' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResponseCreateProductDto.prototype, "message", void 0);
class ResponseUpdateProductDto {
    message;
}
exports.ResponseUpdateProductDto = ResponseUpdateProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'product updated succesfully' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResponseUpdateProductDto.prototype, "message", void 0);
class ResponseDeleteProductDto {
    message;
}
exports.ResponseDeleteProductDto = ResponseDeleteProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'product deleted succesfully' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResponseDeleteProductDto.prototype, "message", void 0);
class AdditionalProductDto {
    id;
    createdAt;
    updatedAt;
}
exports.AdditionalProductDto = AdditionalProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '9818f1bf-c9d6-45a7-96c3-8d8dc644d8a3' }),
    __metadata("design:type", String)
], AdditionalProductDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-03-21T11:39:14.095Z' }),
    __metadata("design:type", String)
], AdditionalProductDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-03-21T11:39:14.095Z' }),
    __metadata("design:type", String)
], AdditionalProductDto.prototype, "updatedAt", void 0);
class ResponseFindProductDto extends (0, swagger_1.IntersectionType)(products_dto_1.CreateProductDto, AdditionalProductDto) {
}
exports.ResponseFindProductDto = ResponseFindProductDto;
//# sourceMappingURL=response.dto.js.map