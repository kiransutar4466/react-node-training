"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const vendors_dto_1 = require("../../vendors/dto/vendors.dto");
class LoginUserDto extends (0, swagger_1.PickType)(vendors_dto_1.CreateVendorDto, [
    'email',
    'password',
]) {
}
exports.LoginUserDto = LoginUserDto;
//# sourceMappingURL=auth.dto.js.map