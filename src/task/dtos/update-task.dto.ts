import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateTaskDto {
  @Field({ nullable: true })
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(['pending', 'on_going', 'done'])
  status?: string;
}
