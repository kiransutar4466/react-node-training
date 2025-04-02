import { ConflictException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { LoginUserDto, UserInputDto } from './dto/auth-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    private readonly logger= new Logger()
    constructor(
        private readonly prismaClient : PrismaClient,
        private readonly configService : ConfigService,
        private readonly jwtService : JwtService
    ){}

     //create user service
     async createUser(userInputDto:UserInputDto) {
        try{
            const hashedPass = bcrypt.hashSync(userInputDto.password,10);

            const userAlreadyExist = await this.prismaClient.users.findFirst({
                where : {
                    email : userInputDto.email
                },
            });

            if(userAlreadyExist){
                this.logger.warn('Email already exist');
                throw new HttpException('Email already exist',
                    HttpStatus.CONFLICT
                )
            }

            const newUser = await this.prismaClient.users.create({
                data : {
                    ...userInputDto,
                    password : hashedPass
                }
            });

            this.logger.log("New user registered succesfully");
            return {
                message:'User Created Succesfully',
                statusCode:HttpStatus.CREATED
            }
        }catch(error){
            this.logger.error("Error in creating user");
            // throw new HttpException('User Cration Failed',
            //     HttpStatus.BAD_REQUEST
            // )
            throw error;
        }
    }

    //login user service
    async loginUser(loginUserDto:LoginUserDto){
        try{
            const {email,password} = loginUserDto;

            const findUser =  await this.prismaClient.users.findFirst({
                        where :{
                            email
                        },
                    });
                    if(!findUser){
                        this.logger.warn(`No user found with mail ${loginUserDto.email}`);
                        throw new HttpException(`Invalid credential` ,
                            HttpStatus.UNAUTHORIZED
                        )
                    }

                    if(!password || !findUser.password){
                        this.logger.warn(`no password provided`);
                        throw new HttpException(`Invalid credential` ,
                            HttpStatus.UNAUTHORIZED
                        )
                    }
                    const checkPass = bcrypt.compareSync(password,findUser.password);
                    if(!checkPass){
                        this.logger.warn(`Wrong password`);
                        throw new HttpException(`Invalid credential` ,
                            HttpStatus.UNAUTHORIZED
                        )
                    }
                    const sec_key = this.configService.get<any>("SECRET_KEY");
                    const payload = {user_id:findUser.id,role:findUser.role};
                    const token = await this.jwtService.signAsync(payload,{secret:sec_key,expiresIn: '1h'});
                    
                    this.logger.log(`User logged succesfully`);
                    return { 
                        message:'User Logged Succesfully',
                        statusCode:HttpStatus.OK,
                        token
                    };
        }catch(error){
            this.logger.warn(`Error for login user`);
            throw error;
        }
    }
}
