import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export enum Role{
    user = "user",
    admin = "admin"
}
export class UserInputDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty({message:'first name is required'})
    firstName : string

    @ApiProperty()
    @IsString()
    @IsNotEmpty({message:'last name is required'})
    lastName : string

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty({message:'email is required'})
    email : string

    @ApiProperty()
    @IsString()
    @IsNotEmpty({message:'password is required'})
    password : string

    @ApiProperty()
    @IsEnum(Role)
    @IsNotEmpty({message:'role is required'})
    role : Role
}

export class LoginUserDto{
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty({message:'email is required'})
    email : string

    @ApiProperty()
    @IsString()
    @IsNotEmpty({message:'password is required'})
    password : string
}