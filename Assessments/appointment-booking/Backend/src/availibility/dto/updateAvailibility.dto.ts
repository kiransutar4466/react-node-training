import { PartialType } from '@nestjs/swagger';
import { CreateAvailibilityDto } from './createAvailibility.dto';

export class UpdateAvailibilityDto extends PartialType(CreateAvailibilityDto) {}
