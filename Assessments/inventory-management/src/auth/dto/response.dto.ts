import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseLoginUserDto {
  @ApiProperty({ example: 'login succesfully' })
  @IsString()
  message: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwODNiM2M4LTI0MjctNDdlNC1hOTdkLTNjMDdmODczODU5ZiIsImVtYWlsIjoiam9obmRvZUBnbWFpbC5jb20iLCJpYXQiOjE3NDI1NTY0MDAsImV4cCI6MTc0MjU1NjcwMH0.KQq3GdX-FsmTpzwcGQBYjVQqlcExxOYrL88RKSvYA0M',
  })
  @IsString()
  token: string;
}
