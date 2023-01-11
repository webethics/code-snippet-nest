import { ApiProperty } from '@nestjs/swagger';

export class UserIdDto {
  @ApiProperty()
  user_id: string;
}