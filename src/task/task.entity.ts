import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Column({
    type: 'text',
  })
  title: string;

  @ApiProperty()
  @Column({
    type: 'text',
  })
  description: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ['pending', 'on_going', 'done'],
    nullable: true,
    default: 'pending',
  })
  status?: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
