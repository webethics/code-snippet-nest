import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateProjectDto {
  @ApiProperty()
  @IsNotEmpty()
  project_name: string;
  @ApiProperty()
  @IsNotEmpty()
  project_type: string;
  @ApiProperty()
  @IsNotEmpty()
  project_status: string;
  @ApiProperty()
  project_description: string;
  @ApiProperty({
    type: Array,
    default: ['string', 'string'],
  })
  requested_by: any;
}
