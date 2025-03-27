import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    loginUser(loginUserDto: LoginUserDto): Promise<{
        message: string;
        token: string;
    }>;
}
