import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Answer } from '../answers/entities/answer.entity';
import { ExamList } from '../enums/examList.enum';
import { SubjectList } from '../enums/subjectList.enum';

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

  @Field(() => String)
  @Column()
  statement: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  feedback: string;

  @Field(() => ExamList)
  @Column()
  exam: ExamList;

  @Field(() => SubjectList)
  @Column()
  subject: SubjectList;

  @Field(() => [Answer])
  @OneToMany((type) => Answer, (answer) => answer.trivia)
  answers: Answer[];
}
