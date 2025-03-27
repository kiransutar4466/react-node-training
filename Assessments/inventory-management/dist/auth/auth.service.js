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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AuthService = AuthService_1 = class AuthService {
    jwtService;
    prisma;
    logger;
    constructor(jwtService, prisma, logger) {
        this.jwtService = jwtService;
        this.prisma = prisma;
        this.logger = logger;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async login(loginUserDto) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email: loginUserDto.email.toLowerCase(),
                    isDeleted: false,
                },
                select: {
                    id: true,
                    email: true,
                    password: true,
                    role: true,
                    firstName: true,
                    lastName: true,
                    inventory: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            });
            if (!user) {
                throw new common_1.HttpException('user not found', common_1.HttpStatus.UNAUTHORIZED);
            }
            const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);
            if (!isPasswordValid) {
                throw new common_1.HttpException('invalid password', common_1.HttpStatus.UNAUTHORIZED);
            }
            return {
                message: 'login succesfully',
                token: await this.jwtService.signAsync({
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    inventoryId: user.inventory?.id,
                    inventoryName: user.inventory?.name,
                }, {
                    secret: process.env.JWT_SECRET_KEY,
                    expiresIn: process.env.JWT_EXPIRE_TIME,
                }),
            };
        }
        catch (error) {
            this.logger.error(`Error in login: ${error}`);
            throw error;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        client_1.PrismaClient,
        common_1.Logger])
], AuthService);
//# sourceMappingURL=auth.service.js.map