import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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

  async getTasks(): Promise<Task[] | undefined> {
    try {
      return await this.taskRepository.find({});
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error);
    }
  }

  async getTask(id: number): Promise<Task | undefined> {
    try {
      const task = await this.taskRepository.findOneBy({ id });
      if (!task) {
        throw new NotFoundException();
      }
      return task;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'something unexpected happened, please try later',
      );
    }
  }
}
