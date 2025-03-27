import { PickType } from '@nestjs/swagger';

import { CreateVendorDto } from 'src/vendors/dto/vendors.dto';

export class LoginUserDto extends PickType(CreateVendorDto, [
  'email',
  'password',
] as const) {}
