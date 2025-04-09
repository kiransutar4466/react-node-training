import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class SearchAvailibilityDto {
  @ApiProperty({
    name: 'providerId',
  })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  providerId: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  date: Date;

  // @ApiProperty()
  // @IsNotEmpty()
  // @Transform(({ value }) => {
  //   const inputDate = new Date(value);
  //   const today = new Date();

  //   inputDate.setHours(0, 0, 0, 0);
  //   today.setHours(0, 0, 0, 0);

  //   if (inputDate < today) {
  //     throw new HttpException(
  //       `Invalid date, do not select past date`,
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }

  //   return inputDate;
  // })
  // @Type(() => Date)
  // @IsDate()
  // date: Date;
}
