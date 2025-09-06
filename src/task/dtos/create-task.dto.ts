import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateTaskDto {
  @Field()
  @ApiProperty({
    type: 'string',
  })
  @IsString()
  title: string;

  @Field()
  @ApiProperty({ type: 'string' })
  @IsString()
  description: string;

  @Field()
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
