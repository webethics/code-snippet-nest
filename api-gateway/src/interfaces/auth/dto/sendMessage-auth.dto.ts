import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsNotEmpty } from 'class-validator';

export class SendMessageDto {
  @ApiProperty()
  @IsNotEmpty()
  phone_number: string;
}
