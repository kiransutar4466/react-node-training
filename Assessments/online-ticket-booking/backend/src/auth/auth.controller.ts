import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginUserDto, UserInputDto } from './dto/auth-user.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // signup api
  @ApiOperation({summary:'Register a user'})
  @Post('/signup')
  async signUp(@Body() userInputDto:UserInputDto) {
    return this.authService.createUser(userInputDto);
  }

  @ApiOperation({summary:'Login a user'})
  @Post('/signin')
  @ApiBody({schema:{example:{email:'abcd@gmail.com',password:"12345"}}})
  @Post('/signin')
  async signIn(@Body() loginUserDto:LoginUserDto){
     return this.authService.loginUser(loginUserDto);
  }

}
