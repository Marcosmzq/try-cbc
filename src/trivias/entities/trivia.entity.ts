import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Course } from 'src/courses/entities/course.entity';
import { TriviasAnswer } from 'src/trivias-answers/entities/trivias-answer.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ExamList } from '../enums/examList.enum';

@Entity()
@ObjectType()
export class Trivia {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @CreateDateColumn()
  created_at: string;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: string;

  @Field(() => Boolean)
  @Column()
  isTrivia: boolean;

  @Field(() => Boolean)
  @Column()
  isFlashcard: boolean;

  @Field(() => String)
  @Column()
  statement: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  feedback: string;

  @Field(() => ExamList)
  @Column()
  exam: ExamList;

  @Field(() => Course)
  @ManyToOne(() => Course, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  course: Course;

  @Field(() => [TriviasAnswer])
  @OneToMany(() => TriviasAnswer, (triviasAnswer) => triviasAnswer.trivia)
  answers: TriviasAnswer[];
}
