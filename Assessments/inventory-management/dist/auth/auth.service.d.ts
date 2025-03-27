import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/auth.dto';
export declare class AuthService {
    private readonly jwtService;
    private readonly prisma;
    private readonly logger;
    constructor(jwtService: JwtService, prisma: PrismaClient, logger: Logger);
    login(loginUserDto: LoginUserDto): Promise<{
        message: string;
        token: string;
    }>;
}
