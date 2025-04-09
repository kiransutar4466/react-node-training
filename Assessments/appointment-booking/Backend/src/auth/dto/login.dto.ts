import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
     @ApiProperty({ example: 'sanket@gmail.com', description: 'User email' })
      @IsEmail()
      @IsNotEmpty()
      email: string;
    
      @ApiProperty({ example: 'pass@123', description: 'User password' })
      @IsString()
      @MinLength(8)
      @IsNotEmpty()
      password: string;
}
