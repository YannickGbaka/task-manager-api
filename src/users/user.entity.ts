import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  lastName: string;

  @Column({
    type: 'enum',
    enum: ['USER', 'ADMIN'],
  })
  role?: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  password: string;

  @Column({
    type: 'date',
  })
  birthDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  static basicFieldsToSelect = [
    'id',
    'email',
    'firstName',
    'lastName',
    'role',
    'birthDate',
    'createdAt',
    'updatedAt',
  ];
}
