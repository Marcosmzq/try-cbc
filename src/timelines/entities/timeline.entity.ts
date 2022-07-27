import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Course } from 'src/courses/entities/course.entity';
import { TimelineEvent } from 'src/timeline-events/entities/timeline-event.entity';
import { User } from 'src/users/entities/user.entity';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@ObjectType()
export class Timeline {
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
  title: string;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => [TimelineEvent])
  @OneToMany(() => TimelineEvent, (events) => events.timeline)
  events: TimelineEvent[];

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
