import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Test } from '@nestjs/testing';
import { User } from 'src/users/user.entity';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

describe('AuthService', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = moduleRef.get(AuthService);
    authController = moduleRef.get(AuthController);
  });

  describe('signUp', () => {
    it('return a user json object', async () => {
      const createUserDto: CreateUserDto = {
        firstName: 'Teddy',
        lastName: 'Smith',
        email: 'teddy@gmail.com',
        password: 'password',
        birthDate: '2025-06-25',
      };

      const user = {
        id: 1,
        email: createUserDto.email,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        password: 'password',
        birthDate: new Date('2025-06-25'),
      } as User;

      jest.spyOn(authService, 'signUp').mockResolvedValue(user);

      expect(await authController.register(createUserDto)).toBe(user);
    });
  });
});
