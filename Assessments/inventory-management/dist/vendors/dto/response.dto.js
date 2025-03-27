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
exports.ResponseFindVendorDto = exports.AdditionalVendorDto = exports.ResponseDeleteVendorDto = exports.ResponseUpdateVendorDto = exports.ResponseCreateVendorDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const vendors_dto_1 = require("./vendors.dto");
class ResponseCreateVendorDto {
    message;
}
exports.ResponseCreateVendorDto = ResponseCreateVendorDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user created succesfully' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResponseCreateVendorDto.prototype, "message", void 0);
class ResponseUpdateVendorDto {
    message;
}
exports.ResponseUpdateVendorDto = ResponseUpdateVendorDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user updated succesfully' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResponseUpdateVendorDto.prototype, "message", void 0);
class ResponseDeleteVendorDto {
    message;
}
exports.ResponseDeleteVendorDto = ResponseDeleteVendorDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user deleted succesfully' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResponseDeleteVendorDto.prototype, "message", void 0);
class AdditionalVendorDto {
    id;
    createdAt;
    updatedAt;
}
exports.AdditionalVendorDto = AdditionalVendorDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '9818f1bf-c9d6-45a7-96c3-8d8dc644d8a3' }),
    __metadata("design:type", String)
], AdditionalVendorDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-03-21T11:39:14.095Z' }),
    __metadata("design:type", String)
], AdditionalVendorDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-03-21T11:39:14.095Z' }),
    __metadata("design:type", String)
], AdditionalVendorDto.prototype, "updatedAt", void 0);
class ResponseFindVendorDto extends (0, swagger_1.IntersectionType)((0, swagger_1.OmitType)(vendors_dto_1.CreateVendorDto, ['password']), AdditionalVendorDto) {
}
exports.ResponseFindVendorDto = ResponseFindVendorDto;
//# sourceMappingURL=response.dto.js.map