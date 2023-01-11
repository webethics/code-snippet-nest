import { ApiProperty } from '@nestjs/swagger';
export class ProjectIdDto {
  @ApiProperty()
  project_id: string;
}
