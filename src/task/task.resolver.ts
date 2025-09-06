import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [Task])
  async tasks() {
    return await this.taskService.getTasks();
  }

  @Query(() => Task)
  async task(@Args('id', { type: () => Int }) id: number) {
    return await this.taskService.getTask(id);
  }
}
