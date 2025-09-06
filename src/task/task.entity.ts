import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  @Field(() => Number)
  id: number;

  @Field()
  @ApiProperty()
  @Column({
    type: 'text',
  })
  title: string;

  @Field()
  @ApiProperty()
  @Column({
    type: 'text',
  })
  description: string;

  @Field({ nullable: true })
  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ['pending', 'on_going', 'done'],
    nullable: true,
    default: 'pending',
  })
  status?: string;

  @Field({ defaultValue: Date.now })
  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
