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
var VendorsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
let VendorsService = VendorsService_1 = class VendorsService {
    logger;
    prisma;
    constructor(logger, prisma) {
        this.logger = logger;
        this.prisma = prisma;
        this.logger = new common_1.Logger(VendorsService_1.name);
    }
    async create(createVendorDto) {
        try {
            this.logger.debug(createVendorDto);
            createVendorDto.email = createVendorDto.email.toLowerCase();
            const user = await this.prisma.user.findUnique({
                where: {
                    email: createVendorDto.email,
                },
            });
            if (user) {
                throw new common_1.HttpException('email already exists', common_1.HttpStatus.CONFLICT);
            }
            createVendorDto.password = bcrypt.hashSync(createVendorDto.password, 10);
            await this.prisma.user.create({
                data: createVendorDto,
            });
            return {
                message: 'user created successfully',
            };
        }
        catch (error) {
            this.logger.error(`Error in create user | ${error}`);
            throw error;
        }
    }
    async findAll(queryFindVendorsDto) {
        try {
            const { page, perPage, firstName, email, lastName, companyName } = queryFindVendorsDto;
            const where = { role: 'VENDOR', isDeleted: false };
            if (email) {
                where.email = {
                    equals: email,
                    mode: 'insensitive',
                };
            }
            if (firstName) {
                where.firstName = {
                    contains: firstName,
                    mode: 'insensitive',
                };
            }
            if (lastName) {
                where.lastName = {
                    contains: lastName,
                    mode: 'insensitive',
                };
            }
            if (companyName) {
                where.companyName = {
                    contains: companyName,
                    mode: 'insensitive',
                };
            }
            this.logger.debug(`perPage | ${perPage}`);
            this.logger.debug(`page | ${page}`);
            let skip = 0;
            if (page) {
                skip = (page - 1) * perPage;
            }
            return await this.prisma.user.findMany({
                take: perPage,
                skip,
                where,
                omit: {
                    password: true,
                    isDeleted: true,
                },
            });
        }
        catch (error) {
            this.logger.error(`Error in findAll | ${error}`);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id,
                    isDeleted: false,
                },
                omit: {
                    password: true,
                    isDeleted: true,
                },
            });
            if (!user) {
                throw new common_1.HttpException(`user not found`, common_1.HttpStatus.UNAUTHORIZED);
            }
            return user;
        }
        catch (error) {
            this.logger.error(`Error in findOne | ${error}`);
            throw error;
        }
    }
    async update(id, updateVendorDto) {
        try {
            const foundUser = await this.prisma.user.findUnique({
                where: {
                    id,
                    isDeleted: false,
                },
            });
            this.logger.debug(foundUser);
            if (!foundUser) {
                throw new common_1.HttpException('user not found', common_1.HttpStatus.UNAUTHORIZED);
            }
            this.logger.log('updateUserDto:', updateVendorDto);
            if (Object.keys(updateVendorDto).includes('email')) {
                const user = await this.prisma.user.findUnique({
                    where: {
                        email: updateVendorDto.email,
                        NOT: { id },
                    },
                });
                if (user) {
                    throw new common_1.HttpException('Email already taken', common_1.HttpStatus.CONFLICT);
                }
            }
            if (Object.keys(updateVendorDto).includes('password') &&
                updateVendorDto.password) {
                updateVendorDto.password = bcrypt.hashSync(updateVendorDto.password, 10);
            }
            await this.prisma.user.update({
                where: { id },
                data: updateVendorDto,
            });
            return { message: 'user updated successfully' };
        }
        catch (error) {
            this.logger.error(`Error in update | ${error}`);
            throw error;
        }
    }
    async remove(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id, isDeleted: false },
            });
            if (!user) {
                throw new common_1.HttpException('user not found', common_1.HttpStatus.UNAUTHORIZED);
            }
            await this.prisma.user.update({
                where: { id },
                data: {
                    isDeleted: true,
                },
            });
            return { message: 'user deleted successfully' };
        }
        catch (error) {
            this.logger.error(`Error in remove | ${error}`);
            throw error;
        }
    }
};
exports.VendorsService = VendorsService;
exports.VendorsService = VendorsService = VendorsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_1.Logger,
        client_1.PrismaClient])
], VendorsService);
//# sourceMappingURL=vendors.service.js.map