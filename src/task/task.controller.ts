import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TaskController {
  constructor(protected readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body(new ValidationPipe()) createTaskDto: CreateTaskDto) {
    return await this.taskService.createTask(createTaskDto);
  }

  @Get()
  async getTasks(): Promise<Task[] | undefined> {
    return await this.taskService.getTasks();
  }

  @Get(':id')
  async getTask(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Task | undefined> {
    return await this.taskService.getTask(id);
  }
}
