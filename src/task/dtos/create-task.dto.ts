import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    type: 'string',
  })
  @IsString()
  title: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  description: string;

  @ApiProperty({
    required: false,
    default: 'pending',
    enum: ['pending', 'on_going', 'done'],
    type: 'string',
  })
  @IsEnum(['pending', 'on_going', 'done'])
  @IsOptional()
  status?: string;
}
