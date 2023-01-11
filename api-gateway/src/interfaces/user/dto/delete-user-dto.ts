import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class DeleteUserDto {
  @ApiProperty()
  user_id: string;
}
