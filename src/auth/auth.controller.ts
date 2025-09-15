import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { AuthUserDto } from './dtos/auth-user.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { User } from 'src/users/user.entity';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxNTE2MjQyNjIyfQ.signature_string_here';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBadRequestResponse({
    description: 'Invalid data provided',
    type: CreateUserDto,
  })
  @ApiCreatedResponse({ description: 'user succesfully created' })
  @Post('register')
  register(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('login')
  @ApiOkResponse({ description: 'Login succesfully done', example: { token } })
  @ApiBadRequestResponse({
    description: 'Invalid data provided',
  })
  async login(@Body() authUserDto: AuthUserDto) {
    return await this.authService.login(authUserDto);
  }
}
