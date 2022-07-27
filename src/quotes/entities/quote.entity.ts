import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Course } from 'src/courses/entities/course.entity';
import { User } from 'src/users/entities/user.entity';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';

@ObjectType()
export class Quote {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @CreateDateColumn()
  created_at: string;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: string;

  @Field(() => String)
  @Column()
  quoteAuthor: string;

  @Field(() => String)
  @Column()
  quoteContent: string;

  @Field(() => User)
  @ManyToOne(() => User, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @Field(() => Course)
  @ManyToOne(() => Course, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  course: Course;
}
