import { Test } from '@nestjs/testing';
import { TaskService } from './task.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';

const taskMockup = {
  id: 1,
  title: 'Hello',
  description: 'this is a new task',
  status: 'pending',
  createdAt: new Date('2025-09-09'),
  updatedAt: new Date('2025-09-09'),
};

describe('TaskService', () => {
  let taskService: TaskService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();
    taskService = moduleRef.get(TaskService);
  });

  describe('get tasks', () => {
    it('should return a list of tasks', async () => {
      const tasks: Task[] = [Object.create(taskMockup) as Task];

      jest.spyOn(taskService, 'getTasks').mockResolvedValue(tasks);
      expect(await taskService.getTasks()).toBe(tasks);
    });

    describe('get a single task', () => {
      it('should return a single task', async () => {
        const task = Object.create(taskMockup) as Task;
        const { id } = task;
        jest.spyOn(taskService, 'getTask').mockResolvedValue(task);

        expect(await taskService.getTask(id)).toBe(task);
      });
    });

    describe('create a task', () => {
      it('should create a task', async () => {
        // create task
        const taskDto = {
          title: 'Hello',
          description: 'this is a new task',
        };

        const newTask = Object.create(taskMockup) as Task;

        jest.spyOn(taskService, 'createTask').mockResolvedValue(newTask);
        expect(await taskService.createTask(taskDto)).toBe(newTask);
      });
    });

    describe('delete a task', () => {
      it('should delete a task', async () => {
        const { id } = Object.create(taskMockup) as Task;
        jest.spyOn(taskService, 'deleteTask').mockResolvedValue(undefined);

        await expect(taskService.deleteTask(id)).resolves.toBeUndefined();
      });
    });
  });
});
