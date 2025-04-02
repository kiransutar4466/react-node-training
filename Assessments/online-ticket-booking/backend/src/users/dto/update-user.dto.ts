import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { UserInputDto } from 'src/auth/dto/auth-user.dto';

export class UpdateUserDto extends PartialType(UserInputDto) {}
