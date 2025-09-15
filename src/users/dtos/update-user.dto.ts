import { IsString, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'user firstname',
    required: false,
  })
  @IsOptional()
  @IsString()
  firstName?: string | undefined;

  @ApiProperty({
    description: 'user last name',
    required: false,
  })
  @IsOptional()
  @IsString()
  lastName?: string | undefined;

  @ApiProperty({
    description: 'user email',
    required: false,
  })
  @IsOptional()
  @IsString()
  email?: string | undefined;

  @ApiProperty({
    description: 'user role',
    enum: ['USER', 'ADMIN'],
    required: false,
  })
  @IsEnum(['USER', 'ADMIN'], {
    message: 'Role must be either USER or ADMIN',
  })
  @IsOptional()
  role?: 'USER' | 'ADMIN';

  @IsDateString()
  @IsOptional()
  birthDate?: string | undefined;
}
