import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ResponseLoginUserDto {
  @ApiProperty({ example: "login succesfully" })
  @IsString()
  message: string;

  @ApiProperty({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjczMmI0Y2I1LTc0MmQtNDk5NC1iNzFmLWMwMTAwNjM2YjlkNiIsImVtYWlsIjoiam9obmRvZUBnbWFpbC5jb20iLCJyb2xlIjoiVkVORE9SIiwiZmlyc3ROYW1lIjoiSm9obiIsImxhc3ROYW1lIjoiRG9lIiwiaW52ZW50b3J5SWQiOiI2ZTNiZjViNC0zZTBiLTRlNGUtOGFiOS0wMDczOTAzM2YyMDUiLCJpbnZlbnRvcnlOYW1lIjoiTXkgSW52ZW50b3J5IiwiaWF0IjoxNzQzOTQzOTE1LCJleHAiOjE3NDQxMTY3MTV9.0BP2Ze00DpJKBI373fMTmR-hNF6CMlptGrNMa7dcj6w",
  })
  @IsString()
  token: string;
}
