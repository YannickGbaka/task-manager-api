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
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { STATUS_CODES } from 'http';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('tasks')
@ApiTags('tasks')
export class TaskController {
  constructor(protected readonly taskService: TaskService) {}

  @ApiCreatedResponse({ description: 'Task successfully created', type: Task })
  @ApiInternalServerErrorResponse({
    description: 'Something unplanned happened',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTask(@Body(new ValidationPipe()) createTaskDto: CreateTaskDto) {
    return await this.taskService.createTask(createTaskDto);
  }

  @ApiOkResponse({
    description: 'Tasks list fetched succesfully',
    type: [Task],
  })
  @ApiInternalServerErrorResponse({
    description: 'Something unexpected happened',
  })
  @Get()
  //   @HttpCode(HttpStatus.OK)
  async getTasks(): Promise<Task[] | undefined> {
    return await this.taskService.getTasks();
  }

  @ApiOkResponse({ description: 'Task fetched successfully', type: Task })
  @ApiNotFoundResponse({ description: 'The task specified does not exist' })
  @Get(':id')
  async getTask(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Task | undefined> {
    return await this.taskService.getTask(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'task successfully updated', type: Task })
  @ApiNotFoundResponse({ description: 'Task was not found' })
  async updateTask(
    @Param('id', new ParseIntPipe()) id: number,
    @Body()
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task | undefined> {
    return await this.taskService.updateTask(id, updateTaskDto);
  }

  @ApiNoContentResponse({ description: 'Operation done successfully' })
  @ApiNotFoundResponse({ description: 'Task was not found' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTask(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    return await this.taskService.deleteTask(id);
  }
}
