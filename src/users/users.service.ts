import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindOptionsSelect, Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { HashingProvider } from '../auth/hashing.provider';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userReposistory: Repository<User>,
    protected readonly hashingProvider: HashingProvider,
  ) {}
  async getUsers() {
    try {
      return this.userReposistory.find({
        select: User.basicFieldsToSelect as FindOptionsSelect<User>,
      });
    } catch (error) {
      console.log(error.message);
      throw new Error('Something unexpected happended, please try out later');
    }
  }

  async getProfile(id: number) {
    try {
      const user = await this.userReposistory.findOne({
        where: { id },
        select: User.basicFieldsToSelect as FindOptionsSelect<User>,
      });
      if (!user) {
        throw new NotFoundException('User was not found');
      }
      return user;
    } catch (e) {
      console.log(e.message);
      throw Error('Internal server error, please try again later');
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.userReposistory.findOne({
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        throw new ForbiddenException('User already exist');
      }

      createUserDto.password = await this.hashingProvider.hashPassword(
        createUserDto.password,
      );
      const userObject = this.userReposistory.create(createUserDto);

      const newUser = await this.userReposistory.save(userObject);
      return newUser;
    } catch (error) {
      console.log(error);
      throw new Error('Something unexpected happened, please try out later');
    }
  }

  async updateUser(body, id: number) {
    try {
      const user = await this.findById(id);

      if (!user) {
        throw new NotFoundException();
      }

      user.birthDate = body.birthDate ?? user.birthDate;
      user.email = body.email ?? user.email;
      user.firstName = body.firstName ?? user.firstName;
      user.lastName = body.lastName ?? user.lastName;
      user.role = body.role ?? user.role;

      user.password = await this.hashingProvider.hashPassword(
        user.password ?? body.password,
      );

      return this.userReposistory.save(user);
    } catch (error) {
      console.log(error.message);
      throw new Error('Something unexpected happended');
    }
  }

  async deleteUser(id: number) {
    try {
      const user = await this.findById(id);
      if (!user) {
        throw new NotFoundException('User was not found');
      }
      return await this.userReposistory.delete({ id });
    } catch (error) {
      console.log(error.message);
      throw new Error('something unexpected happened');
    }
  }

  async findById(id: number): Promise<User | null> {
    return await this.userReposistory.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return await this.userReposistory.findOneBy({ email });
  }
}
