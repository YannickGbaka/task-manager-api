import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [Task])
  async tasks(): Promise<Task[] | undefined> {
    return await this.taskService.getTasks();
  }

  @Query(() => Task)
  async task(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Task | undefined> {
    return await this.taskService.getTask(id);
  }

  /**
   * To call this mutation in GraphiQL, use the following syntax:
   *
   * mutation {
   *   createTask(createTaskDto: {
   *     title: "My Task Title",
   *     description: "A description of the task",
   *     status: "pending" // or "on_going" or "done"
   *   }) {
   *     id
   *     title
   *     description
   *     status
   *     createdAt
   *   }
   * }
   */
  @Mutation(() => Task)
  async createTask(
    @Args('createTaskDto') createTaskDto: CreateTaskDto,
  ): Promise<Task | undefined> {
    return await this.taskService.createTask(createTaskDto);
  }

  @Mutation(() => Task)
  async updateTask(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateTaskDto') updateTaskDto: UpdateTaskDto,
  ): Promise<Task | undefined> {
    return await this.taskService.updateTask(id, updateTaskDto);
  }

  @Mutation(() => Task)
  async deleteTask(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Task | undefined> {
    // First, get the task (to return it after deletion)
    const task = await this.taskService.getTask(id);
    if (!task) {
      throw new Error('Task not found');
    }
    await this.taskService.deleteTask(id);
    return task;
  }
}
