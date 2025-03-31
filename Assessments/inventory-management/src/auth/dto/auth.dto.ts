import { IntersectionType, PickType } from "@nestjs/swagger";
import {
  AdditionalVendorDto,
  CreateVendorDto,
} from "src/vendors/dto/vendors.dto";

export class LoginUserDto extends IntersectionType(
  PickType(CreateVendorDto, ["email"] as const),
  AdditionalVendorDto,
) {}
