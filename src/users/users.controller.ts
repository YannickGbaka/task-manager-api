import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Role } from '../types/role.enum';
import { Roles } from '../decorators/role.decorator';
import { LoggingInteceptor } from '../interceptors/logging.interceptor';
import { ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';

@UseInterceptors(LoggingInteceptor)
@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('')
  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN)
  @ApiOkResponse({
    example: [
      {
        id: 1,
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        role: 'USER',
        password: '********',
        birthDate: new Date('2025-01-01'),
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-01'),
      } as User,
    ],
  })
  @ApiForbiddenResponse({ description: 'Token is invalid' })
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  @ApiOkResponse()
  @ApiForbiddenResponse({ description: 'Description' })
  profile(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.getProfile(id);
  }

  @Patch(':id')
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id', new ParseIntPipe()) userId: number,
  ) {
    return await this.userService.updateUser(updateUserDto, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(
    @Param('id', new ParseIntPipe()) userId: number,
  ): Promise<void> {
    await this.userService.deleteUser(userId);
  }
}
