import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(['pending', 'on_going', 'done'])
  @IsOptional()
  status?: string;
}
