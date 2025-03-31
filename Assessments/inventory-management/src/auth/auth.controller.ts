import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/auth.dto";
import { ResponseLoginUserDto } from "./dto/response.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "login successfully",
    type: ResponseLoginUserDto,
  })
  @ApiOperation({ summary: "Login User" })
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }
}
