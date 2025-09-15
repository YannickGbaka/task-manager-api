import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { HashingProvider } from '../auth/hashing.provider';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';

describe('UserController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: HashingProvider,
          useValue: {
            hashPassword: jest.fn().mockResolvedValue('hashedPassword'),
            comparePassword: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    usersService = moduleRef.get(UsersService);
    usersController = moduleRef.get(UsersController);
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
      } as User;
      const result = [mockUser];

      jest.spyOn(usersService, 'getUsers').mockResolvedValue(result);

      expect(await usersController.getUsers()).toBe(result);
    });
  });
});
