import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskResolver } from './task.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { JwtModule } from '@nestjs/jwt';
import authConfig from 'src/auth/config/auth.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [TaskService, TaskResolver],
  controllers: [TaskController],
  imports: [
    TypeOrmModule.forFeature([Task]),
    ConfigModule.forFeature(authConfig),
    JwtModule.registerAsync(authConfig.asProvider()),
  ],
})
export class TaskModule {}
