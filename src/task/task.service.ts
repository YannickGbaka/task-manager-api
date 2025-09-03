import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) protected readonly taskRepository: Repository<Task>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto) {
    try {
      const task = this.taskRepository.create(createTaskDto);
      return await this.taskRepository.save(task);
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(
        'Something unexpected happened, please try again later',
      );
    }
  }
}
