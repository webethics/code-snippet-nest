import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsNotEmpty } from 'class-validator';

export class VerifyDto {
  @ApiProperty()
  @IsNotEmpty()
  phone_number: string;
  @ApiProperty()
  @IsNotEmpty()
  vcode: string;
}
