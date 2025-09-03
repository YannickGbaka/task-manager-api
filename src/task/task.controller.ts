import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(protected readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body(new ValidationPipe()) createTaskDto: CreateTaskDto) {
    return await this.taskService.createTask(createTaskDto);
  }
}
