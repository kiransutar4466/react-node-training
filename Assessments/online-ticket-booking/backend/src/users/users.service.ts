import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { ApiBearerAuth } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly logger = new Logger();
  constructor(private readonly prismaClient: PrismaClient) {}

  async getAllUsers() {
    try {
      const userData = await this.prismaClient.users.findMany({
        where:{
          isDeleted : false
        }
      });
      this.logger.log('All users data fetched succesfully');
      const usersWithoutPass = userData.map(({ password,isDeleted, ...rest }) => rest);
      return {
        message: 'All users data fetched succesfully',
        statusCode: HttpStatus.OK,
        data: usersWithoutPass,
      };
    } catch (error) {
      this.logger.error('Error in fetch users data');
      throw new HttpException(
        'Error in fetch users data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserById(id: number) {
    try {
      const userFound = await this.prismaClient.users.findUnique({
        where: { 
          id,
          isDeleted : false
        },
      });

      if (!userFound) {
        this.logger.error(`No user found.`);
        throw new HttpException(
          'No user found',
          HttpStatus.NOT_FOUND,
        );
      }
      this.logger.log(`User found with id ${id}`);
      const { password,isDeleted, ...userWithoutPass } = userFound;
      return {
        message: 'user found',
        statusCode: HttpStatus.OK,
        data: userWithoutPass,
      };
    } catch (error) {
      this.logger.error(`Error in fetch user record by id`);
      throw error;
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    try {
      const userFound = await this.prismaClient.users.findUnique({
        where: { 
          id,
          isDeleted:false
        },
      });

      if (!userFound) {
        this.logger.error(`No user found.`);
        throw new HttpException(
          'No user found.',
          HttpStatus.NOT_FOUND,
        );
      }

      if (updateUserDto.email) {
        const mailAlreadyExist = await this.prismaClient.users.findFirst({
          where: {
            email: updateUserDto.email,
          },
        });
        if (mailAlreadyExist) {
          this.logger.warn(`User already exist with same mail`);
          throw new HttpException(
            'User already exist with same mai',
            HttpStatus.CONFLICT,
          );
        }
      }

      if (updateUserDto.password) {
        const hashedPass = bcrypt.hashSync(updateUserDto.password, 10);
        const updatedUserWithPass = await this.prismaClient.users.update({
          where: { id },
          data: {
            ...updateUserDto,
            password: hashedPass,
          },
        });
        this.logger.log(`User updated succesfully(with password)`);
        // const {password,...userWithoutPass} = updatedUserWithPass;
        return {
          message: 'user updated succesfully',
          statusCode: HttpStatus.OK,
        };
      }

      const updatedUser = await this.prismaClient.users.update({
        where: { id },
        data: {
          ...updateUserDto,
        },
      });
      this.logger.log(`User updated succesfully.`);
      // const {password,...userWithoutPass} = updatedUser;
      return {
        message: 'user updated succesfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      this.logger.error(`Error in fetch user record by id`);
      throw error;
    }
  }

  async deleteUser(id: number) {
    try{
      const userFound = await this.prismaClient.users.findUnique({
          where : {
            id,
            isDeleted:false
          }
      });

      if(!userFound){
          this.logger.error(`No user found.`);
          throw new HttpException(
            'No user found.',
            HttpStatus.NOT_FOUND,
          );
      }
      // const deletedUser = await this.prismaClient.users.delete({
      //     where : {id}
      // });

      const deletedUser = await this.prismaClient.users.update({
        where : {id},
        data : {isDeleted:true}
      });

      this.logger.log(`User Deleted Succesfully`);
      // const {userPass,...userWithoutPass} = deletedUser;

      return {
        message : "User deleted succesfully",
        statusCode:HttpStatus.OK
      };
  }catch(error){
      this.logger.error('Error for deleting user');
      throw error;
  }
  }
}
