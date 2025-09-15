import { ApiParam, ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsDateString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: "user's firstname",
    example: 'Teddy',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: "User's lastname",
    example: 'Smith',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: "User's email",
    example: 'teddy@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: "User's role",
    examples: ['USER', 'ADMIN'],
  })
  @IsEnum(['USER', 'ADMIN'])
  role?: 'USER' | 'ADMIN';

  @ApiProperty({
    description: "User's password",
    example: 'password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: "User's password",
    example: '2025-05-23',
    type: 'string',
  })
  @IsDateString()
  @IsNotEmpty()
  birthDate: string;
}
