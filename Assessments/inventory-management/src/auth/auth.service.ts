/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { LoginUserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaClient,
    private readonly logger: Logger,
  ) {
    this.logger = new Logger(AuthService.name);
  }

  async login(loginUserDto: LoginUserDto) {
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
        throw new HttpException('user not found', HttpStatus.UNAUTHORIZED);
      }
      const isPasswordValid = await bcrypt.compare(
        loginUserDto.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new HttpException('invalid password', HttpStatus.UNAUTHORIZED);
      }

      return {
        message: 'login succesfully',
        token: await this.jwtService.signAsync(
          {
            id: user.id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            inventoryId: user.inventory?.id,
            inventoryName: user.inventory?.name,
          },
          {
            secret: process.env.JWT_SECRET_KEY,
            expiresIn: process.env.JWT_EXPIRE_TIME,
          },
        ),
      };
    } catch (error) {
      this.logger.error(`Error in login: ${error}`);
      throw error;
    }
  }
}
