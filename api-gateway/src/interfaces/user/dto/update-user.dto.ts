import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  phone_number: string;
  @ApiProperty()
  @IsNotEmpty()
  full_name: string;
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
