import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
      private JwtService: JwtService,
      private prisma: PrismaClient,
      private logger: Logger,
    ) {
      this.logger = new Logger(AuthService.name);
    }

   async login(loginDto: LoginDto) {
     try {
       const userFind = await this.prisma.provider.findUnique({
         where: {
           email: loginDto.email,
           isDeleted: false,
         },
       });
 
       if (!userFind) {
         this.logger.error('Provider not found');
         throw new HttpException('Provider not found', HttpStatus.NOT_FOUND);
       }
       const passwordMath = await bcrypt.compareSync(
         loginDto.password,
         userFind.password,
       );
 
       if (!passwordMath) {
         this.logger.error('Password Incorrect');
         throw new HttpException(
           'Password is incorrect',
           HttpStatus.BAD_REQUEST,
         );
       }
 
       const token = await this.JwtService.signAsync(
         {
           userId: userFind.id,
           userEmail: userFind.email,
           userRole: userFind.role,
           userFirstName: userFind.firstName,
           userLastName: userFind.lastName,
         },
         {
           secret: process.env.SECRETKEY,
           expiresIn: process.env.EXPTIME,
         },
       );
       this.logger.log(`Login successfully and Token is ${token}`);
       const { createdAt, updatedAt, password, isDeleted, ...data } = userFind;
       return {
         status: HttpStatus.OK,
         message: 'Login successfully',
         token: token,
         result: data,
       };
     } catch (error) {
       this.logger.error(`Error is: ${error}`);
       throw error;
     }
   }
  }
